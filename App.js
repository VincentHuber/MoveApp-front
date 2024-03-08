import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';

import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/ReviewScreen';


const Stack = createNativeStackNavigator();



const store = configureStore({
  reducer: { user },
 });


export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




