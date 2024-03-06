import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput, KeyboardAvoidingView, Platform, StatusBar,
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
  <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      <View>
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
      </KeyboardAvoidingView>
        
        
      
        );

    };
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFCFCF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight || 0,
    
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

  

  inputWrapper: {
    backgroundColor:"#FFFFFF",
    width: 317,
    height:328,
    borderRadius: 20, 
    overflow: 'hidden', 
    marginBottom: 10,},
    //maxHeight: Dimensions.get('window').height - (StatusBar.currentHeight || 0) - 100},

  input: {
    
    backgroundColor:'#F4F4F4',
    color :'black',
    height: 180,
    marginBottom:50,
    marginTop:130,
    width: 300,
    marginLeft:8,
    paddingLeft:10,
    borderRadius: 20,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    
  },
  
  buttonReview:{
    fontFamily: 'Poppins_600SemiBold',
    backgroundColor:'#4A46FF',
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
    color: 'white',
    paddingTop: 5,
    
  },

});

 




//<Image source={require('./')} style={styles.profileImage} />

