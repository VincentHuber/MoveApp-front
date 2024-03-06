
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import EditProfileScreen from './screens/Editprofile';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <EditProfileScreen />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




