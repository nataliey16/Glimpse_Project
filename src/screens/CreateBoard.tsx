import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import uuid from 'react-native-uuid';

interface BoardDataEntry {
  id: string;
  name: string;
  description: string;
}

function CreateBoard({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const [boardForm, setBoardForm] = useState({
    name: '',
    description: '',
  });

  const getNewID = (): string => {
    const id = String(uuid.v4());
    console.log(`ID is : ${id}`);
    return id;
  };

  const handleInputChange = (name: string, value: string) => {
    console.log(
      setBoardForm(prevEntry => ({
        ...prevEntry,
        [name]: value,
      })),
    );
  };

  const handleSubmit = () => {
    if (!boardForm.name.trim() || !boardForm.description.trim()) {
      console.log('Board name and description are required');
      return;
    }
    const boardWithId: BoardDataEntry = {...boardForm, id: getNewID()};

    console.log('Submitting board:', boardWithId);

    navigation.navigate('Profile', {
      screen: 'MyProfile',
      params: {newSubmittedBoard: boardWithId},
    });

    setBoardForm({name: '', description: ''});
  };

  useEffect(() => {
    console.log(boardForm);
  }, [boardForm]);

  return (
    <View style={style.board}>
      {/* Header */}
      <Text style={style.boardTxt}>Create a</Text>
      <Text style={style.boardTxt2}>Board</Text>

      {/* Board Name */}
      <View>
        <Text style={style.txt}>Board Name</Text>
      </View>
      <TextInput
        style={style.inputBox}
        placeholder="Name this Board"
        placeholderTextColor="darkgrey"
        value={boardForm.name}
        onChangeText={value => handleInputChange('name', value)}
      />

      {/* Description of Board */}
      <View>
        <Text style={style.txt}>Describe the purpose of this board:</Text>
      </View>
      <TextInput
        style={style.inputBox2}
        placeholder="Dreams & Goals, Manifest your future self..."
        placeholderTextColor="darkgrey"
        value={boardForm.description}
        onChangeText={value => handleInputChange('description', value)}
        multiline
      />

      {/* Buttons */}
      <View style={style.btnContainer}>
        {/* Cancel Button */}
        <TouchableOpacity
          style={style.submitBtn}
          onPress={() => {
            setBoardForm({name: '', description: ''});
            //navigation.goBack();
          }}>
          <Text style={style.submitBtnTxt}>Cancel</Text>
        </TouchableOpacity>

        {/* Create Button */}
        <TouchableOpacity style={style.submitBtn} onPress={handleSubmit}>
          <Text style={style.submitBtnTxt}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  // Main Board Style
  board: {
    backgroundColor: '#F7BC7D',
    flex: 1,
  },
  boardTxt: {
    fontSize: 45,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontFamily: 'Montserrat',
  },
  boardTxt2: {
    fontSize: 45,
    color: '#FFF',
    fontWeight: 'bold',
    paddingLeft: 20,
    fontFamily: 'Montserrat',
  },

  // Input Text and Box Style
  txt: {
    fontSize: 15,
    color: '#3A3B45',
    paddingLeft: 20,
    paddingTop: 10,
  },
  inputBox: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#F79D7D',
    borderWidth: 2.5,
    fontSize: 16,
  },
  inputBox2: {
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#F79D7D',
    borderWidth: 2.5,
    fontSize: 16,
    textAlignVertical: 'top', // Aligns multiline text at the top
  },

  // Button Styles
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  submitBtn: {
    backgroundColor: '#F79D7D',
    width: 100,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnTxt: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default CreateBoard;
