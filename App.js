import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';

import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';


const store = configureStore({
  reducer: { user },
 });


function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HomeScreen/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;



