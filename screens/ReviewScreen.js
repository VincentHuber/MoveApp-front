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
  const [addReviews, setAddReviews] = useState([]);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    setIsReviewVisible(!isReviewVisible);
  }; // cette fonction au clik fait disparaitre le bouton "laisser un avis"

  const handleAddReview = () => {
    setIsVisible(false);
    setIsReviewVisible(true);
    setReviewText('');
    setAddReviews([...addReviews, reviewText]); 
  }//cette fonction au clik fait disparaitre le bouton "deposer mon avis" et aura pour but d'ecrire et ajouter un avis

  

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
              <TouchableOpacity style={styles.buttonreview} onPress={handleAddReview}>
                <Text style={styles.buttontextreview}>Deposer mon avis</Text>
              </TouchableOpacity>
              </View>)}
              <View style={styles.reviewList}>
          {addReviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text>{review}</Text>
            </View>
          ))}</View>
             
        
        </View>
      </KeyboardAvoidingView>
        );

    };

    /*<View style={styles.reviewList}>
    {reviews.map((review, index) => (
    <View key={index} style={styles.reviewItem}>
  <Text>{review}</Text>
</View>
))}*/
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:100,
    paddingTop: StatusBar.currentHeight || 0,
    
  },
  
  button: {
    borderColor: '#4A46FF',
    borderWidth: 2,
    width: 317,
    height: 53,
    //marginBottom: 300,
    marginTop:200,
    paddingVertical: 12,
    borderRadius: 40,
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
    backgroundColor:"yellow",
    width: 317,
    height:350,
    borderRadius: 20, 
    overflow: 'hidden',
    marginTop:100, 
    marginBottom: 10,},
    //maxHeight: Dimensions.get('window').height - (StatusBar.currentHeight || 0) - 100},

  input: {
    
    backgroundColor:'#F4F4F4',
    //color :'black',
    height: 180,
    marginBottom:50,
    marginTop:150,
    width: 300,
    marginLeft:8,
    paddingLeft:10,
    borderRadius: 20,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    
  },
  
  buttonreview:{
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

  buttontextreview:{
    color: 'white',
    paddingTop: 5,
    
  },

  /*reviewList: {
    backgroundColor:'red',
    width: 10,
    height:10,
    marginTop:199,
  },*/

  reviewItem: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },

});



 




//<Image source={require('./')} style={styles.profileImage} />

