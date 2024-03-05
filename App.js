
import { StyleSheet, Text, View } from 'react-native';

import EditProfile from './screens/Editprofile'; 


import MapScreen from './screens/MapScreen';

import HomeScreen from './screens/HomeScreen';




function App() {
  return (<View>
    <EditProfile />   
     <View style={styles.container}>
   

      <MapScreen />



      <HomeScreen />
      <ReviewScreen />

    </View>
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

export default App;



