import React, { useState, useEffect } from "react";
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
import { AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const BACKEND_ADDRESS = "http://192.168.100.196:3000";

export default function ReviewScreen({ navigation, route }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sender, setSender] = useState("");
  const [ratingStars, setRatingStars] = useState(0);

  const [reviewText, setReviewText] = useState("");
  const [addReviews, setAddReviews] = useState([]);
  // const [isTextInputVisible, setIsTextInputVisible] = useState(false);

  const [isReviewVisible, setIsReviewVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  //const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const token = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value);

  const [userData, setUserData] = useState({
    nickname: "",
    profilePicture: "",
  });

  const [averageStar, setAverageStar] = useState(0);

  const handleButtonClick = () => {
    const navigation = useNavigation();
    navigation.navigate("NomDeLaPage");
  };

  //ce fetch permet de recuperer la data nickname et profilepicture et le Average token : NlQWH0dlyhQZ7WaZSGzth9129mtttLGj
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${route.params.othersToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("data.user.reviews", data.user.reviews);
          setUserData(data.user);
          setAverageStar(data.user.averageStar);
          setAddReviews(data.user.reviews);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
  }, [token]);

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

  /*const closeInputWrapper = () => {
    setReviewModalVisible(!reviewModalVisible);
  };*/

  const handleAddReview = () => {
    // Vérifiez si le commentaire est vide (la methode trim permet d'enlever les espaces vides)
    // avec cette conditon l'utilisateur ne pourra pas laisser un commentaire vide

    if (reviewText.trim() === "") {
      console.error("Erreur : Champ de saisie vide.");
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
      sender: user.email,
      date: selectedDate,
      stars: ratingStars,
      review: trimmedReviewText,
    };

    setAddReviews([...addReviews, newReview]);

    // Envoi du commentaire au backend pour que ensuite la requéte puisse etre enregistré dans la bdd
    fetch(`${BACKEND_ADDRESS}/review/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: token,
        receiver: route.params.othersToken,
        stars: ratingStars,
        date: selectedDate,
        review: trimmedReviewText,
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
          {!isVisible && (
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <AntDesign name="left" size={24} color="#4A46FF" />
            </TouchableOpacity>
          )}
        </View>

        {!isVisible && (
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  userData.profilePicture ||
                  "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
              }}
              style={styles.profileImageTop}
            />
            <View style={styles.textNickname}>
              <Text
                style={[
                  styles.pseudoText,
                  {
                    fontSize:
                      userData.nickname && userData.nickname.length > 10
                        ? 40
                        : 25,
                  },
                ]}
              >
                {userData.nickname}
              </Text>
              <TouchableOpacity
                style={styles.buttonDisplayReviews}
                onPress={handleButtonClick}
              >
                <FontAwesomeIcon icon={faStar} style={styles.starIcon} />
                <Text style={styles.averageStarText}>
                  {userData.averageStar}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View>
          {!isVisible && (
            <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
              <Text style={styles.text}>Laisser un avis</Text>
            </TouchableOpacity>
          )}
          {isVisible && (
            <View
              style={{
                borderColor: "white",
                //borderWidth: 1,
              }}
            >
              <View style={styles.inputWrapper}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 90,
                  }}
                >
                  <Text style={styles.nicknameWrapper}>
                    {userData.nickname}
                  </Text>
                  <Text>{selectedDate.toLocaleDateString()}</Text>
                  {renderStars()}

                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => setIsVisible(false)}
                  >
                    <AntDesign name="left" size={24} color="#4A46FF" />
                  </TouchableOpacity>
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
                  <Text style={styles.buttontextreview}>Déposer mon avis</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
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
                <Text>{review.sender}</Text>
                <Text>{review.date.toString()}</Text>
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
  },

  backButton: {
    marginTop: 1,
    top: 100,
    top: 80,
    right: 110,
  },

  profileImageContainer: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "center",
  },

  buttonDisplayReviews: {
    flexDirection: "row",
    backgroundColor: "#4A46FF",
    paddingRight: 10,
    bottom: 30,
    width: 78,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  globalAverage: {
    color: "white",
  },

  averageStarText: {
    color: "white",
    fontSize: 16,
  },

  starIcon: {
    color: "white",
    marginRight: 5,
  },

  profileImageTop: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "white",
  },

  pseudoText: {
    position: "absolute",
    //left: 0,
    //top:0,
    bottom: 1,
    //right:1,

    color: "black",
    paddingVertical: 30,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 60,
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
    fontSize: 18,
    textAlign: "center",
    color: "#4A46FF",
    fontWeight: "SemiBold",
    paddingTop: 2,
  },

  inputWrapper: {
    backgroundColor: "white",
    bottom: 40,
    top: 15,
    width: 317,
    height: 390,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    maxHeight:
      Dimensions.get("window").height - (StatusBar.currentHeight || 0) - 100,
  },

  nicknameWrapper: {
    fontSize: 16,
    fontWeight: "800",
  },

  buttonClose: {
    right: 130,
    bottom: 100,
  },

  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    height: 180,
    marginVertical: 20,
    marginHorizontal: 10,
    width: 300,
    marginLeft: 8,
    paddingTop: 20,
    borderRadius: 20,
  },

  buttonreview: {
    //fontFamily: "Poppins_600SemiBold",
    backgroundColor: "#4A46FF",
    width: 317,
    height: 53,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    top: 13,
    bottom: 40,
  },

  buttontextreview: {
    color: "white",
    paddingTop: 5,
  },

  reviewItem: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  starItem: {
    flexDirection: "row",
  },

  sender: {
    backgroundColor: "red",
    borderColor: "red",
  },
});
