import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PhotoCard from '../components/PhotoCard';
import PhotoModal from '../components/PhotoModal';
import StoredInModal from '../components/StoredInModal';

type Photo = {
  id: number;
  width: number;
  height: number;
  src: {
    small: string;
    original: string;
  };
};

const screenWidth = Dimensions.get('window').width;
const spacing = 10;
const numColumns = 2;
const columnWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

const PEXELS_API_KEY =
  'JLpCpa8eVdGrX5GjMtVDtjtTdf3vvgJlWOQ8vlNUXuMU1CVTZM1KEQ8u';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_CURATED_URL = 'https://api.pexels.com/v1/curated';
const PEXELS_API_FEATURED_URL =
  'https://api.pexels.com/v1/collections/featured';
const PEXELS_API_GET_PHOTO_URL = 'https://api.pexels.com/v1/photos';

const SearchScreen = ({navigation}: {navigation: any}) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<[Photo[], Photo[]]>([[], []]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showBoardOptions, setShowBoardOptions] = useState(false);

  // Fetch curated photos
  const fetchCuratedPhotos = async () => {
    setLoading(true);
    setError('');
    setColumns([[], []]);

    try {
      const response = await fetch(`${PEXELS_API_CURATED_URL}`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const data = await response.json();
      distributePhotos(data.photos); // Distribute curated photos into columns
    } catch (err) {
      setError('Failed to load curated photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchPhotos = async () => {
    if (!keyword) {
      Alert.alert('Enter Key Word for Searching');
      return;
    }
    setLoading(true);
    setError('');
    setColumns([[], []]);

    try {
      const response = await fetch(
        `${PEXELS_API_URL}?query=${keyword}&per_page=10`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        },
      );
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        distributePhotos(data.photos);
      } else {
        setError('No photos found.');
      }
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({y: 0, animated: true});
      }
    } catch (err) {
      setError('Error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const distributePhotos = (photos: Photo[]) => {
    const columnHeights = [0, 0];
    const newColumns: [Photo[], Photo[]] = [[], []];

    photos.forEach(photo => {
      const photoHeight = (photo.height / photo.width) * columnWidth;
      const columnIndex = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      columnHeights[columnIndex] += photoHeight + spacing;
      newColumns[columnIndex].push(photo);
    });

    setColumns(newColumns);
  };

  const openPhotoModal = (photo: Photo) => {
    // console.log('Fetched photo:', photo);
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setModalVisible(false);
  };

  const addToMoodBoard = () => {
    // Alert.alert('Mood Board', 'Photo added to your Mood Board!');
    // closePhotoModal();
    setShowBoardOptions(true);
  };

  const handleSelectExistingBoard = () => {
    console.log('Selected Existing Board');
    setShowBoardOptions(false);
    closePhotoModal();
  };

  const handleCreateNewBoard = () => {
    console.log('Create New Board');
    setShowBoardOptions(false);
    closePhotoModal();
    navigation.navigate('Create Board', {
      screen: 'CreateBoard',
    });
  };

  const handleCloseStoredInModal = () => {
    setShowBoardOptions(false);
  };

  useEffect(() => {
    fetchCuratedPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Photos..."
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={searchPhotos}
      />

      {loading}
      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.featuredText}>
        {keyword ? `${keyword}` : `Curated`} Photos
      </Text>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.photoGrid}>
        {columns.map((columnPhotos, columnIndex) => (
          <View key={columnIndex} style={styles.column}>
            {columnPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => openPhotoModal(photo)}>
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  columnWidth={columnWidth}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* selected photo */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          visible={modalVisible}
          onClose={closePhotoModal}
          onAddToMoodBoard={addToMoodBoard}
        />
      )}

      {/* Stored In Modal */}
      {showBoardOptions && selectedPhoto && (
        <StoredInModal
          visible={showBoardOptions}
          onClose={handleCloseStoredInModal}
          onSelectExistingBoard={handleSelectExistingBoard}
          onCreateNewBoard={handleCreateNewBoard}
          navigation={navigation}
          photo={selectedPhoto}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 2,
    backgroundColor: '#FCFFF2',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    width: '90%',
    marginLeft: 20,
    justifyContent: 'center',
  },
  photoContainer: {
    marginBottom: 16,
    marginLeft: spacing,
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  featuredText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
    color: '#000',
  },
  photoList: {
    paddingBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing,
  },
  column: {
    width: columnWidth,
  },
});

export default SearchScreen;
