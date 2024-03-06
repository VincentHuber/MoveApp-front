import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';

import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/ReviewScreen';


const store = configureStore({
  reducer: { user },
 });


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ReviewScreen/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




