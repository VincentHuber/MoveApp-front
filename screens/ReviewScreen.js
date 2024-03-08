import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import Star from "../../Move-front/assets/star.js";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as farStar, faStarHalf as farStarHalf, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';


const BACKEND_ASSRESS = "http://192.168.10.122:3000";

export default function ReviewScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [addReviews, setAddReviews] = useState([]);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);

  // cette fonction au clik fait disparaitre le bouton "laisser un avis"
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsReviewVisible(!isReviewVisible);
  };

  const handleAddReview = () => {
    // Vérifiez si le commentaire est vide
    if (reviewText.trim() === "") {
      console.error("Veuillez laisser un commentaire.");
      return;
    }
    // la methode slice (...)
    const trimmedReviewText = reviewText.slice(0, 250);

    // Vérifiez si la longueur du commentaire dépasse pas 250 caractères
    //la propriété warn (...)
    if (reviewText.length > 250) {
      console.warn("Vous avez dépasser le nombre de caractère autorisé.");
    }

    // Si le commentaire n'est pas vide, le traitement continue
    setIsVisible(false);
    setIsReviewVisible(true);
    setReviewText("");
    setAddReviews([...addReviews, trimmedReviewText]);

    console.log(reviewText);

    // Envoi du commentaire au backend
    fetch(`${BACKEND_ASSRESS}/review/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: reviewText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Review ajouté avec succés");
        } else {
          console.error("Erreur lors de l'ajout du review", data.error);
        }
      });
  };

  const handleStarPress = (index) => {
    setRatingStars(index + 1);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 64 : -StatusBar.currentHeight
      }
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
        />

        <View>
          {isReviewVisible && (
            <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
              <Text style={styles.text}>Laisser un avis</Text>
            </TouchableOpacity>
          )}
          {isVisible && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.inputWrapper}>
                <View>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      style={styles.buttonstars}
                      filled={index < ratingStars}
                      onPress={() => handleStarPress(index)}
                    />
                  ))}
                </View>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  placeholder="Votre avis"
                  value={reviewText}
                  onChangeText={setReviewText}
                />
              </View>
              <View style={styles.buttonreviewcontainer}>
                <TouchableOpacity
                  style={styles.buttonreview}
                  onPress={handleAddReview}
                >
                  <Text style={styles.buttontextreview}>Deposer mon avis</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View>
            {addReviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text>{review}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "blue",
    alignItems: "center",
    justifyContent: "center",
    //marginTop:100,
    //paddingTop: StatusBar.currentHeight || 0,
  },

  button: {
    borderColor: "#4A46FF",
    borderWidth: 2,
    width: 317,
    height: 53,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "#4A46FF",
    fontWeight: "SemiBold",
    paddingTop: 4,
  },

  inputWrapper: {
    backgroundColor: "white",
    width: 317,
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    maxHeight:
      Dimensions.get("window").height - (StatusBar.currentHeight || 0) - 100,
  },

  starWrapper: {
    color: "red",
  },

  starContainer: {
    flexDirection: "row",
    width: 100,
    marginBottom: 0,
    paddingLeft: 460,
    paddingTop: 100,
    //justifyContent:'center',
    alignItems: "center",
    color: "red",
  },

  buttonstars: {
    backgroundColor: "yellow",
    height: 20,
    width: 20,
  },

  input: {
    backgroundColor: "#F4F4F4",
    height: 180,
    marginBottom: 50,
    marginTop: 100,
    width: 300,
    marginLeft: 8,
    paddingTop:20,
    borderRadius: 20,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
  },

  buttonreview: {
    fontFamily: "Poppins_600SemiBold",
    backgroundColor: "#4A46FF",
    width: 317,
    height: 53,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },

  buttontextreview: {
    color: "white",
    paddingTop: 5,
  },

  /*reviewList: {
    backgroundColor:'red',
    width: 10,
    height:10,
    marginTop:199,
  },*/

  reviewItem: {
    backgroundColor: "white",
    //height:173,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 1,
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
