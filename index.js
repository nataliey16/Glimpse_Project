/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Main from './src/Main';
import NestedNavigation from './src/navigation/NestedNavigation';

AppRegistry.registerComponent(appName, () => NestedNavigation);
