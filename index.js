/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NestedNavigation from './src/navigation/NestedNavigation';

AppRegistry.registerComponent(appName, () => NestedNavigation);
