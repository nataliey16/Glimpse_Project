import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateBoard from '../screens/CreateBoard';

const BoardStack = createNativeStackNavigator();

function CreateBoardStackNav(): React.JSX.Element {
  return (
    <BoardStack.Navigator>
      <BoardStack.Screen
        name="CreateBoard"
        component={CreateBoard}></BoardStack.Screen>
    </BoardStack.Navigator>
  );
}

export default CreateBoardStackNav;
