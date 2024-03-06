import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ReviewScreen() {

  const [isVisible, setIsVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [addReview, setAddReview] = useState('');
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  };

    

return (
      <View>
      
        
          <Text style={styles.text}>Laisser un avis</Text>
       
        
        
      </View>
    );

    };
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    borderColor: '#4A46FF',
    borderWidth: 2,
    width: 317,
    height: 53,
    marginTop: 500,
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#4A46FF',
    fontWeight: 'SemiBold',
    paddingTop: 4,
  }, 

  inputtext:{ 
    width: '100%',
    height: '0%',
    paddingLeft: 180,
    borderRadius: 20,


  },

  input: {
    
    backgroundColor:'#F4F4F4',
    color :'black',
    height: 180,
    width: 250,
    borderRadius: 20,

  },

  buttonreviewcontainer:{
    

  },

  buttonReview:{
    borderColor: '#4A46FF',
    borderWidth: 2,
    width: 317,
    height: 53,
    paddingVertical: 12,
    paddingtop:100,
    borderRadius: 20,
    alignItems: 'center'

  },

  textReview:{
    color: '#4A46FF',
    paddingTop: 5,
    
  }

});
  
 




//<Image source={require('./')} style={styles.profileImage} />

