import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  // FlatList,
  ActivityIndicator,
} from 'react-native';
import {database} from '../utils/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  // deleteField,
} from 'firebase/firestore';
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
  const [boards, setBoards] = useState<Board[]>([]);
  const [editBoard, setEditBoard] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoardName, setSelectedBoardName] = useState<string | null>(
    null,
  );

  const handleEdit = () => {
    setEditBoard(true);
  };

  const openDeleteModal = (boardId: string, boardName: string) => {    if (!isModalVisible) {
      console.log('Open delete modal for modal id:', boardId);
      setSelectedBoardId(boardId);
      setSelectedBoardName(boardName);
      setIsModalVisible(true);
    }
  };
  //   console.log('Open delete modal for modal id:', boardId);
  //   setIsModalVisible(true);
  //   setSelectedBoardId(boardId);
  // };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteModal = async (boardId: string) => {
    try {
      console.log('Attempting to delete board with ID:', boardId);
      const boardDocRef = doc(database, 'boards', boardId);
      await deleteDoc(boardDocRef);

      console.log(`Delete board with id:${boardId}`);

      setBoards(prevBoards => {
        console.log('Current boards:', prevBoards);
        const filteredBoards = prevBoards.filter(board => board.id !== boardId);
        console.log('Boards after deletion:', filteredBoards);
        return filteredBoards;
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const fetchBoardsFromDB = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(collection(database, 'boards'), orderBy('createdAt', 'desc')),
      );

      const boardsData: Board[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        photos: doc.data().photos || [],
      }));
      console.log('Fetched Boards:', boardsData);
      setBoards(boardsData);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (route.params?.newSubmittedBoard) {
          console.log(
            'Received submitted board:',
            route.params.newSubmittedBoard,
          );
          setBoards(prevBoards => [
            route.params.newSubmittedBoard,
            ...prevBoards,
          ]);
          navigation.setParams({newSubmittedBoard: null}); // Clear params
        } else {
          await fetchBoardsFromDB(); // Regular fetch when screen focuses
        }
      };

      fetchData();
    }, [route.params?.newSubmittedBoard]),
  );

  // useEffect(() => {
  //   if (route.params?.newSubmittedBoard) {
  //     console.log('Received submitted board:', route.params.newSubmittedBoard);
  //     setBoards(prevBoards => [...prevBoards, route.params.newSubmittedBoard]);
  //     const fetchBoardsFromDB = async () => {
  //       setIsLoading(true);
  //       try {
  //         const querySnapshot = await getDocs(collection(database, 'boards'));
  //         const boardsData: Board[] = querySnapshot.docs.map(doc => ({
  //           // id: doc.data().board_id,
  //           id: doc.id,
  //           name: doc.data().name,
  //           description: doc.data().description,
  //           photos: doc.data().photos,
  //         }));
  //         console.log('Fetched Boards:', boardsData);
  //         setBoards(boardsData);
  //       } catch (error) {
  //         console.error('Error fetching boards:', error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchBoardsFromDB();

  //     // Clear params to avoid re-triggering the effect
  //     navigation.setParams({newSubmittedBoard: null});
  //   }
  // }, [route.params?.newSubmittedBoard]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const fetchBoardsFromDB = async () => {
  //       setIsLoading(true);
  //       try {
  //         const querySnapshot = await getDocs(collection(database, 'boards'));
  //         const boardsData: Board[] = querySnapshot.docs.map(doc => ({
  //           id: doc.id,
  //           // id: doc.data().board_id,
  //           name: doc.data().name,
  //           description: doc.data().description,
  //           photos: doc.data().photos,
  //         }));
  //         console.log('useFocusEffect Fetched Boards:', boardsData);
  //         setBoards(boardsData);
  //       } catch (error) {
  //         console.error('Error fetching boards:', error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     // fetchBoardsFromDB();
  //     setTimeout(fetchBoardsFromDB, 3000);
  //   }, []),
  // );

  return (
    <View style={style.profileBg}>
      {/* Edit Button */}
      <TouchableOpacity onPress={handleEdit}>
        <Text style={style.editText}>Edit</Text>
      </TouchableOpacity>

      {/* User Profile Section */}
      <View style={style.userPf}>
        {/* <Image
          source={require('../images/profile/woman_profile.jpg')}
          style={style.profileImage}
        /> */}
        <View style={style.textContainer}>
          <Text style={style.userIntro}>Create your Vision with</Text>
          <Text style={style.headerTxt}>GLIMPSE</Text>
          {/* <Text style={style.userName}></Text> */}
        </View>
      </View>

      {/* Content Section */}
      <View style={style.profileText}>
        {/* <ScrollView style={style.scrollContainer}> */}
        <Text style={style.longContent}>
          Your ideas, moods, and dreams all in one place.
        </Text>
        {/* <Text style={style.moodTxt}>Mood Board</Text> */}
      </View>

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={style.loadingText}>Loading Boards...</Text>
        </View>
      ) : boards.length === 0 ? (
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
          {boards.map(board => {
            const fullBoard = boards.find(b => b.id === board.id);
            const firstPhotoUri = fullBoard?.photos?.[0]?.src?.small;
            console.log('fullBoard', fullBoard);
            console.log('firstPhotoUri', firstPhotoUri);

            return (
              <Pressable
                key={board.id}
                onPress={() => {
                  navigation.navigate('BoardDetails', {
                    boardId: board.id,
                  });
                }}>
                <View style={style.boardCard}>
                  {/* Board Name */}
                  <View style={style.boardHeader}>
                    <Text style={style.boardName}>{board.name}</Text>

                    {/* Edit Icons at the Top-Right */}
                    {editBoard && (
                      <View style={style.editIconsContainer}>
                        <TouchableOpacity
                          style={style.deleteIcon}
                          onPress={() => openDeleteModal(board.id, board.name)}>
                          <Text style={style.iconText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.cancelIcon}
                          onPress={() => setEditBoard(false)}>
                          <Text style={style.iconText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  {/* Photos Row */}
                  <View style={style.photoRow}>
                    {fullBoard?.photos?.slice(0, 4).map((photo, index) => (
                      <Image
                        key={index}
                        source={{uri: photo.src.small}}
                        style={style.boardPhoto}
                      />
                    ))}
                    {(!fullBoard?.photos || fullBoard.photos.length === 0) && (
                      <Text style={style.noPhotosText}>No Images</Text>
                    )}
                  </View>
                </View>

                {isModalVisible && (
                  <DeleteModal
                    handleCancelModal={handleCancelModal}
                    handleDeleteModal={() =>
                      handleDeleteModal(selectedBoardId!)
                    }
                    boardId={selectedBoardId!}
                    boardName={selectedBoardName!}
                  />
                )}
              </Pressable>
            );
          })}
          <View style={style.createBoardSection}>
            <Text style={style.createBoardText}>Create New Board</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Create Board')}>
              <Image
                source={require('../assets/icons/create.png')}
                style={style.iconImg}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFF',
  },
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
    alignContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
  },
  userIntro: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4F5F7',
    textAlign: 'left',
    marginBottom: 2,
    lineHeight: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F4F5F7',
    textAlign: 'center',
    lineHeight: 50,
    width: '100%',
    // paddingRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  longContent: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
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
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5856CB',
  },
  createBoardSection: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FFF',
    paddingBottom: 40,
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
    backgroundColor: 'rgba(232, 234, 246, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
  },
  boardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  boardPhoto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 5,
  },
  noPhotosText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  headerTxt: {
    fontSize: 50,
    fontWeight: '800',
    fontFamily: 'montserrat',
    color: '#fff',
    textShadowColor: '#5856CB',
    textShadowOffset: {width: 1, height: 5},
    textShadowRadius: 10,
    borderColor: '#C3CFFA',
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  editIconsContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
  },
  deleteIcon: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  cancelIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
    padding: 5,
  },
  iconText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Profile;
