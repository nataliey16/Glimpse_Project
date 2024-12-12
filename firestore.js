import React from 'react';
import {View, Text} from 'react-native';

// import {
//   getFirestore,
//   collection,
//   query,
//   getDocs,
//   doc,
//   addDoc,
//   setDoc,
// } from 'firebase/firestore';

const Firestore = () => {
  const database = getFirestore();
  //references the board in the boards tables within the database
  const boardRef = collection(database, 'boards');

  return (
    <View>
      <Text>Add data</Text>
    </View>
  );
};

export {database};

export default Firestore;
