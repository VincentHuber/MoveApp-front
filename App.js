
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <MapScreen/>

      <HomeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
