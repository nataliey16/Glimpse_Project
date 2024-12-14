import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PhotoCard from '../components/PhotoCard';
import { database } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
  const boardId = route.params?.boardId;
  console.log(`Board ID: ${route.params?.boardId}`);
  const board = boards.find((b) => b.id === boardId);

  useEffect(() => {
    const fetchBoardsFromDB = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'boards'));
        const boardsData: Board[] = querySnapshot.docs.map(doc => ({
          id: doc.data().board_id,
          name: doc.data().name,
          description: doc.data().description,
          photos: doc.data().photos
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

  const firstPhoto = board?.photos?.[0];

  return (
    <View style={style.BoardDetailsBg}>
      {/* Edit Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('Edit BoardDetails');
        }}>
        <Text style={style.editText}>Edit</Text>
      </TouchableOpacity>

      {/* BoardDetails Section */}
      {board ? (
        <View style={style.userPf}>
          {firstPhoto && (
            <Image
              source={{ uri: firstPhoto.src?.small }}
              style={style.BoardDetailsImage}
            />
          )}
          <View style={style.textContainer}>
            <Text style={style.userIntro}>{board.description}</Text>
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
                >
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
    </View>
  );
}

const style = StyleSheet.create({
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
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  userIntro: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F4F5F7',
    textAlign: 'left',
    marginBottom: 2,
    lineHeight: 50,
  },
  userName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F4F5F7',
    textAlign: 'left',
    lineHeight: 50,
    width: '100%',
    paddingRight: 10,
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
  boardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  boardDescription: {
    fontSize: 14,
    color: '#555',
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
});

export default BoardDetails;
