import './app/sheets';
import {SheetProvider} from "react-native-actions-sheet";
import RootLayout from './app/_layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <RootLayout></RootLayout>
  );
};

export default App;
