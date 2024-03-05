
import { StyleSheet, Text, View } from 'react-native';

// import EditProfile from './screens/Editprofile'; 
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';


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



