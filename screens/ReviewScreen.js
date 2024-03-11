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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const BACKEND_ADDRESS = "http://192.168.10.123:3000";

export default function ReviewScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [addReviews, setAddReviews] = useState([]);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Etat pour stocker la date sélectionnée

  const [userData, setUserData] = useState({
    nickname: "",
    profilePicture: "",
  });

  //const user = useSelector((state) => state.user.value);

  /*useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          const user = data.user;
          setUserData({
            nickname: user.nickname,
            profilePicture: user.profilePicture,
          });
        } else {
          console.error("Aucun utilisateur trouvé.");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
  }, []);*/

  //fonction bouton retour pour revenir au screen precedent
  const handleGoBack = () => {
    navigation.goBack();
  };

  // cette fonction au clik fait disparaitre le bouton "laisser un avis" pour faire apparaitre le champs de commentaire.
  //j'ai opté pour ceci a la place d'une modale
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsReviewVisible(!isReviewVisible);
  };

  const handleAddReview = () => {
    // Vérifiez si le commentaire est vide (la methode trim permet d'enlever les espaces vides)
    //avec cette conditon l'utilisateur ne pourra pas laisser un commentaire vide

    if (reviewText.trim() === "") {
      console.error("Veuillez laisser un commentaire.");
      return;
    }
    // la methode slice permet de limiter la longueur du texte a 250 caractères
    const trimmedReviewText = reviewText.slice(0, 250);

    // Vérifiez si la longueur du commentaire dépasse pas 250 caractères
    //la methode warn génère dans la console un message d'avertissment
    if (reviewText.length > 250) {
      console.warn("Vous avez dépasser le nombre de caractère autorisé.");
    }

    // Si le commentaire n'est pas vide, le traitement continue
    setIsVisible(false);
    setIsReviewVisible(true);
    setReviewText("");
    const newReview = {
      review: trimmedReviewText,
      stars: ratingStars,
      date: selectedDate,
    };

    setAddReviews([...addReviews, newReview]);

    console.log(reviewText);
    console.log(selectedDate);
    console.log(renderStars());

    // Envoi du commentaire au backend pour que ensuite la requéte puisse etre enregistré dans la bdd
    fetch(`${BACKEND_ADDRESS}/review/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        review: reviewText,
        stars: ratingStars,
        date: selectedDate,
      }),
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

  //le systéme de notatation par etoile
  const handleStarPress = (index) => {
    setRatingStars(index + 1);
  };

  const renderStars = () => {
    const starSize = 36;
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            <FontAwesomeIcon
              icon={faStar}
              size={starSize}
              style={[
                styles.star,
                index < ratingStars ? styles.filledStar : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
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
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <AntDesign name="left" size={24} color="#4A46FF" />
          </TouchableOpacity>
        </View>

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
                <View>{renderStars()}</View>
                <Text style={{ marginLeft: 118, marginTop: 110 }}>
                  {selectedDate.toLocaleDateString()}
                </Text>
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
                <View style={styles.starItem}>
                  {[...Array(review.stars)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      style={[
                        styles.star,
                        { color: i < review.stars ? "#4A46FF" : "grey" },
                      ]}
                    />
                  ))}
                </View>
                <Text>{review.date.toLocaleDateString()}</Text>
                <Text>{review.review}</Text>
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
  },

  backButton: {
    flexDirection: "absolute",
    marginBottom: 50,
    marginRight: 280,
  },

  button: {
    flexDirection: "absolute",
    borderColor: "#4A46FF",
    borderWidth: 2,
    width: 317,
    height: 53,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "#4A46FF",
    fontWeight: "SemiBold",
    paddingTop: 4,
  },

  inputWrapper: {
    flexDirection: "absolute",
    backgroundColor: "white",
    width: 317,
    height: 390,
    borderRadius: 20,
    overflow: "hidden",
    maxHeight:
      Dimensions.get("window").height - (StatusBar.currentHeight || 0) - 100,
  },

  starContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 55,
    paddingTop: 140,
  },

  star: {
    marginRight: 5,
    alignItems: "center",
    color: "gray",
    width: 10,
  },
  filledStar: {
    color: "#4A46FF",
  },

  input: {
    backgroundColor: "#F4F4F4",
    position: "absolute",
    height: 180,
    marginBottom: 50,
    marginTop: 200,
    width: 300,
    marginLeft: 8,
    paddingTop: 20,
    borderRadius: 20,
  },

  buttonreview: {
    fontFamily: "Montserrat_600SemiBold",
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

  reviewItem: {
    flexDirection: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 1,
  },

  starItem: {
    flexDirection: "row",
  },
});
