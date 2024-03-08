import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,ScrollView,
  Platform, 
  StatusBar,Dimensions
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Star from '../../Move-front/assets/star.js'


const BACKEND_ASSRESS='http://192.168.10.122:3000'



export default function ReviewScreen() {

  const [isVisible, setIsVisible] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [addReviews, setAddReviews] = useState([]);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);


  // cette fonction au clik fait disparaitre le bouton "laisser un avis"
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    setIsReviewVisible(!isReviewVisible);
  }; 

  const handleAddReview = () => {
    setIsVisible(false);
    setIsReviewVisible(true);
    setReviewText('');
    setAddReviews([...addReviews, reviewText]);


    console.log(reviewText)

    fetch(`${BACKEND_ASSRESS}/review/`, {
      method : 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({review: reviewText}),
  })
  .then(response => response.json())
  .then (data =>{
    if (data.result){
      console.log('Review ajouté avec succés');
    }else{
      console.error('Erreur lors de l\'ajout du review', data.error);
    }
  });

};

const handleStarPress = (index) => {
  setRatingStars(index + 1);
};



return (<KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -StatusBar.currentHeight}
        style={{ flex: 1 }}
      >
  
  <View style={styles.container}>
   
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true}/>
      
     <View>
      {isReviewVisible && (
      <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
        <Text style={styles.text}>Laisser un avis</Text>
        </TouchableOpacity>
        )}
        {isVisible  && (
        <View style={styles.starWrapper}>
            <View style={styles.starContainer}>
           {[...Array(5)].map((_, index) => (
                  <Star key={index} filled={index < ratingStars} onPress={() => handleStarPress(index)} />
                ))}
                </View>
              </View>
              )}
               {isVisible && ( 
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
              <View>
                {addReviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text>{review}</Text>
                </View>
                ))}
                </View>
     </View>
     </View>
     </KeyboardAvoidingView>
  
        )

    };

    
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:100,
    //paddingTop: StatusBar.currentHeight || 0,
    
  },
  
  button: {
    borderColor: '#4A46FF',
    borderWidth: 2,
    width: 317,
    height: 53,
    //marginBottom: 300,
    marginTop:200,
    //marginLeft:100,
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
    backgroundColor:"black",
    width: 317,
    height:350,
    borderRadius: 20, 
    overflow: 'hidden',
    marginTop:100, 
    marginLeft:340,
    marginBottom:10,
    maxHeight: Dimensions.get('window').height - (StatusBar.currentHeight || 0) - 100
  },

  starContainer:{
    flexDirection: 'row',
    width:1000,
    marginBottom: 0,
    paddingLeft:125,
    paddingTop:100,
    alignItems: 'center',


  },
  
   

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
    marginLeft:340,
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
    marginTop:20,
    //marginBottom: 10,
  },

});



 












/*const renderStars = () => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => setRatingStars(i)}>
        <Icon
          name={ratingStars >= i ? 'ios-star' : 'ios-star-outline'}
          size={32}
          color={ratingStars >= i ? '#FFD700' : 'gray'}
        />
      </TouchableOpacity>
    );
  }
  return stars };*/
  