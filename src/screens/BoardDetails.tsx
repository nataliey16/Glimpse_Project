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

function BoardDetails({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  const [newBoard, setNewBoard] = useState<
    {id: string; name: string; description: string}[]
  >([]);

  useEffect(() => {
    if (route.params?.newSubmittedBoard) {
      console.log('Received submitted board:', route.params.newSubmittedBoard);
      setNewBoard(prevBoards => [
        ...prevBoards,
        route.params.newSubmittedBoard,
      ]);
      // navigation.setParams({newBoard: null}); // Clear params to avoid duplicate additions
    }
  }, [route.params?.newSubmittedBoard]);

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
      <View style={style.userPf}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={style.BoardDetailsImage}
        />
        <View style={style.textContainer}>
          <Text style={style.userIntro}>Hello </Text>
        </View>
      </View>

      {/* Content Section */}

      {/* Render Images */}

      <ScrollView style={style.scrollContainer}>
        {newBoard.map(board => (
          <Pressable key={board.id}>
            <View style={style.boardCard}>
              <Text style={style.boardName}>{board.name}</Text>
              <Text style={style.boardDescription}>{board.description}</Text>
            </View>
          </Pressable>
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
});

export default BoardDetails;
