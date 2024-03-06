import {
    StyleSheet,
    Text,View
  } from 'react-native';

  export default function ReviewScreen () {

    

return (
      <View>
        
          <Text style={styles.text}>Laisser un avis</Text>
       
      </View>
    );

    };
    


const styles = StyleSheet.create ({
  container:  {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent:'center',
  },
  
  text: {
    
    color: 'black',
    fontSize: 50,
  },


})