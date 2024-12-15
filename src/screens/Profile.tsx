import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import {database} from '../utils/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import DeleteModal from '../components/DeleteModal';

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

function Profile({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  // const [boards, setBoards] = useState<{name: string; description: string}[]>(
  //   [],
  // );
  const [newBoard, setNewBoard] = useState<
    {id: string; name: string; description: string}[]
  >([]);

  const [boards, setBoards] = useState<Board[]>([]);
  const [editBoard, setEditBoard] = useState(false);

  useEffect(() => {
    if (route.params?.newSubmittedBoard) {
      console.log('Received submitted board:', route.params.newSubmittedBoard);
      setNewBoard(prevBoards => [
        ...prevBoards,
        route.params.newSubmittedBoard,
      ]);
      // navigation.setParams({newBoard: null}); // Clear params to avoid duplicate additions
      const fetchBoardsFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(database, 'boards'));
          const boardsData: Board[] = querySnapshot.docs.map(doc => ({
            id: doc.data().board_id,
            name: doc.data().name,
            description: doc.data().description,
            photos: doc.data().photos,
          }));
          console.log('Fetched Boards:', boardsData);
          setBoards(boardsData);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
      fetchBoardsFromDB();
      // setTimeout(fetchBoardsFromDB, 3000);

      // Clear params to avoid re-triggering the effect
      navigation.setParams({newSubmittedBoard: null});
    }
  }, [route.params?.newSubmittedBoard]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBoardsFromDB = async () => {
        try {
          const querySnapshot = await getDocs(collection(database, 'boards'));
          const boardsData: Board[] = querySnapshot.docs.map(doc => ({
            id: doc.data().board_id,
            name: doc.data().name,
            description: doc.data().description,
            photos: doc.data().photos,
          }));
          console.log('useFocusEffect Fetched Boards:', boardsData);
          setBoards(boardsData);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
      // fetchBoardsFromDB();
      setTimeout(fetchBoardsFromDB, 3000);
    }, []),
  );

  const handleEdit = () => {
    setEditBoard(true);
  };

  return (
    <View style={style.profileBg}>
      {/* Edit Button */}
      <TouchableOpacity onPress={handleEdit}>
        <Text style={style.editText}>Edit</Text>
      </TouchableOpacity>

      {/* User Profile Section */}
      <View style={style.userPf}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={style.profileImage}
        />
        <View style={style.textContainer}>
          <Text style={style.userIntro}>Hi,</Text>
          <Text style={style.userName}>Gabrielle!</Text>
        </View>
      </View>
      <DeleteModal />

      {/* Content Section */}
      <View style={style.profileText}>
        {/* <ScrollView style={style.scrollContainer}> */}
        <Text style={style.longContent}>
          Your ideas, moods, and dreams all in one place.
        </Text>
        <Text style={style.moodTxt}>Mood Board</Text>
      </View>

      {/* Render Boards */}
      {newBoard.length === 0 ? (
        <View style={style.createBoardSection}>
          <Text style={style.createBoardText}>Create a Board</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Create Board')}>
            <Image
              source={require('../assets/icons/create.png')}
              style={style.iconImg}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={style.scrollContainer}>
          {newBoard.map(board => {
            const fullBoard = boards.find(b => b.id === board.id);
            const firstPhotoUri = fullBoard?.photos?.[0]?.src?.small;
            console.log(`fullBoard`, fullBoard);
            console.log(`firstPhotoUri`, firstPhotoUri);

            return (
              <Pressable
                key={board.id}
                onPress={() => {
                  navigation.navigate('BoardDetails', {
                    boardId: board.id,
                  });
                }}>
                <View style={style.boardCard}>
                  <Text style={style.boardName}>{board.name}</Text>
                  <Text style={style.boardDescription}>
                    {board.description}
                  </Text>

                  {firstPhotoUri ? (
                    <Image
                      source={{uri: firstPhotoUri}}
                      style={style.profileImage}
                    />
                  ) : (
                    <Text>No Image Now</Text>
                  )}

                  {editBoard && (
                    <View style={style.editButtonView}>
                      <TouchableOpacity
                        style={[style.editButton, style.deleteButton]}>
                        <Text style={style.editButtonText}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.editButton, style.cancelButton]}
                        onPress={() => setEditBoard(false)}>
                        <Text style={style.editButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={style.createBoardSection}>
                  <Text style={style.createBoardText}>Create a Board</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Create Board')}>
                    <Image
                      source={require('../assets/icons/create.png')}
                      style={style.iconImg}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  profileBg: {
    flex: 1,
    backgroundColor: '#F79D7D',
  },
  userPf: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  profileText: {
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
  editButtonView: {
    padding: 10,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F79D7D',
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
});

export default Profile;
