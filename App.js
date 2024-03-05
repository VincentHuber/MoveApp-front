
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen'


function App() {
  return (
    <View style={styles.container}>
      <MapScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;



