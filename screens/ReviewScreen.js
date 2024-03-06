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
  const [isReviewVisible, setIsReviewVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    setIsReviewVisible(!isReviewVisible);
  }; // cette fonction au clik fait disparaitre le bouton "laisser un avis"

  const handleAddReview = () => {
    setIsVisible(false);
    setIsReviewVisible(true);
    setReviewText(''); // cette fonction au clik fait disparaitre le bouton "deposer mon avis"
  }

  

return (
<View style={styles.container}>
      {isReviewVisible && (
      <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
        <Text style={styles.text}>Laisser un avis</Text>
        </TouchableOpacity>
      )}
        {isVisible  && (
        <View style={styles.inputWrapper}>
          <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Votre avis"
              value={reviewText}
              onChangeText={setReviewText}
              />
              </View>)}
              {isVisible && (
              <View style={styles.buttonreviewcontainer}>
              <TouchableOpacity style={styles.buttonReview} onPress={handleAddReview}>
                <Text style={styles.textReview}>Deposer mon avis</Text>
              </TouchableOpacity>
              </View>)}
        
            
        
        
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
    marginBottom: 300,
    paddingVertical: 12,
    borderRadius: 20,
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

  /*inputtext:{ 
    width: 50,
    height: 100,
    paddingLeft: 180,
    paddingRight:180,
    borderRadius: 20,
    borderColor:'gray',


  },*/

  inputWrapper: {
    backgroundColor:"yellow",
    width: 317,
    height:328,
    borderRadius: 20, // Ajout du border radius
    overflow: 'hidden', // Pour que le contenu déborde
    marginBottom: 10,

  },

  input: {
    
    backgroundColor:'gray',
    color :'black',
    height: 180,
    marginBottom:50,
    marginTop:130,
    width: 300,
    marginLeft:8,
    paddingLeft:100,
    borderRadius: 20,
    
  },

  buttonreviewcontainer:{
    

  },

  buttonReview:{
    fontFamily: 'Poppins_600SemiBold',
    borderColor: '#4A46FF',
    borderWidth: 2,
    width: 317,
    height: 53,
    //marginBottom:5000,
    paddingVertical: 12,
    //paddingtop:100,
    //paddingLeft:0,
    borderRadius: 20,
    alignItems: 'center'

  },

  textReview:{
    color: '#4A46FF',
    paddingTop: 5,
    
  }

});

 




//<Image source={require('./')} style={styles.profileImage} />

