import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import PhotoCard from '../components/PhotoCard';
import {database} from '../utils/firebase';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';

type Photo = {
  id: number;
  width: number;
  height: number;
  src: {
    small: string;
    original: string;
  };
};

type Board = {
  id: string;
  name: string;
  description: string;
  photos: Photo[] | null;
};

const screenWidth = Dimensions.get('window').width;
const spacing = 10;
const numColumns = 2;
const columnWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

function BoardDetails({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [columns, setColumns] = useState<[Photo[], Photo[]]>([[], []]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [firstPhoto, setFirstPhoto] = useState<Photo | null>(null);

  const boardId = route.params?.boardId;
  console.log(`Board ID: ${route.params?.boardId}`);
  const board = boards.find(b => b.id === boardId);

  useEffect(() => {
    const fetchBoardsFromDB = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'boards'));
        const boardsData: Board[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          photos: doc.data().photos,
        }));
        console.log('Details Page Fetched Boards:', boardsData);
        setBoards(boardsData);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoardsFromDB();
  }, []);

  useEffect(() => {
    if (board?.photos) {
      distributePhotos(board.photos);
      setFirstPhoto(board.photos[0] || null);
    }
  }, [board]);

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

  const handleDeletePhoto = async (photoId: number) => {
    if (!board) return;

    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const updatedPhotos =
              board.photos?.filter(photo => photo.id !== photoId) || [];
            const boardDocRef = doc(database, 'boards', board.id);
            await updateDoc(boardDocRef, {photos: updatedPhotos});
            setBoards(prevBoards =>
              prevBoards.map(b =>
                b.id === board.id ? {...b, photos: updatedPhotos} : b,
              ),
            );
            // Update columns and firstPhoto state
            distributePhotos(updatedPhotos);
          } catch (error) {
            console.error('Error deleting photo:', error);
          }
        },
      },
    ]);
  };

  // const firstPhoto = board?.photos?.[0];

  // function handleDeletePhoto(id: number) {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <View style={style.BoardDetailsBg}>
      <TouchableOpacity
        style={style.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={style.buttonText}>Back to Profile</Text>
      </TouchableOpacity>
      {/* Edit Button */}
      <TouchableOpacity
        onPress={() => {
          setEditMode(!editMode);
        }}>
        <Text style={style.editText}>{editMode ? 'Done' : 'Edit'}</Text>
      </TouchableOpacity>

      {/* BoardDetails Section */}
      {board ? (
        <View style={style.userPf}>
          {firstPhoto && (
            <Image
              source={{uri: firstPhoto.src?.small}}
              style={style.BoardDetailsImage}
            />
          )}
          <View style={style.textContainer}>
            <Text style={style.boardName}>{board.name}</Text>
            <Text style={style.boardDesc}>{board.description}</Text>
          </View>
        </View>
      ) : (
        <Text>Board</Text>
      )}

      {/* Content Section */}

      {/* Render Images */}
      <ScrollView ref={scrollViewRef} contentContainerStyle={style.photoGrid}>
        {columns.map((columnPhotos, columnIndex) => (
          <View key={columnIndex} style={style.column}>
            {columnPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => editMode && handleDeletePhoto(photo.id)}>
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  columnWidth={columnWidth}
                  style={editMode ? style.editablePhoto : undefined}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#F79D7D',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  BoardDetailsBg: {
    flex: 1,
    backgroundColor: '#F79D7D',
  },
  userPf: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  BoardDetailsImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  BoardDetailsText: {
    marginTop: 20,
    marginLeft: 20,
  },
  textContainer: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  boardName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F4F5F7',
    textAlign: 'left',
    marginBottom: 2,
    lineHeight: 50,
  },
  boardDesc: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#F4F5F7',
    textAlign: 'left',
    marginBottom: 2,
    lineHeight: 50,
  },

  scrollContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  longContent: {
    fontSize: 16,
    color: '#FFF',
  },
  moodTxt: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  editText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20,
  },
  createBoardSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  createBoardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    paddingTop: 40,
  },
  iconImg: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  boardCard: {
    backgroundColor: '#E8EAF6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },

  photoGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing,
  },
  column: {
    width: columnWidth,
  },
  editablePhoto: {
    opacity: 0.5,
  },
});

export default BoardDetails;
