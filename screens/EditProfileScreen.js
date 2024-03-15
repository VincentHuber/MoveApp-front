import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
import Foot from "../assets/foot.js";
import Basket from "../assets/basket.js";
import Running from "../assets/running.js";
import Tennis from "../assets/tennis.js";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/users.js";

// Adresse du backend
const BACKEND_ADDRESS = 'http://192.168.100.196:3000';


const EditProfileScreen = () => {
  const navigation = useNavigation();

  // image par défaut au cas ou il n'y pas d'image trouvée
  const defaultImage = "../assets/imagePerso.png";
  
  const dispatch = useDispatch();

  const handleLogOut = () => {
  dispatch(logout())
  navigation.navigate("Home");
  }

  // Logique pour gérer l'interaction avec le bouton "Avis"
  const handleReview = () => {
    console.log("Bouton Avis cliqué");
    navigation.navigate("Review");
  };

  // Fonction pour afficher 8 étoiles à la place du mdp
  const getPasswordStars = () => {
    return "**********";
  };

  const [successMessage, setSuccessMessage] = useState(false);

  //const pour ajuster taille inputs de manière dynamique
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [ambitionHeight, setAmbitionHeight] = useState(0);

  const authToken = useSelector((state) => state.user.value.token);

  //stocker les sports
  const [selectedSports, setSelectedSports] = useState({
    Football: false,
    Basketball: false,
    Running: false,
    Tennis: false,
  });
  //pour gérer sélec/désélec sports
  const handleAddSport = (sport) => {
    setSelectedSports((prevState) => {
      return {
        ...prevState,
        [sport]: !prevState[sport],
      };
    });
  };

  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    password: "",
    adress: "",
    description: "",
    sports: "",
    ambition: "",
    coverPicture: "",
    profilePicture: "",
    message: "",
  });

  //pour upload photo profile:
  const uploadProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result =>", result);

    if (!result.canceled) {
      setUserData({ ...userData, profilePicture: result.assets[0].uri });
    }
  };

  //pour upload photo couverture:
  const uploadCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({ ...userData, coverPicture: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    // Mettre à jour les sports dans l'état userData
    const updatedUserData = {
      ...userData,
      sports: selectedSports,
    };

    // logique pour modifier les champs utilisateur à partir de l'état userData et les mettre à jour
    const updatedFields = {};
    for (const key in updatedUserData) {
      if (updatedUserData[key] !== "") {
        updatedFields[key] = updatedUserData[key];
      }
    }
    console.log("Champs mis à jour :", updatedFields);

    console.log("authToken => ", authToken);

    fetch(`${BACKEND_ADDRESS}/user/updateProfile/${authToken}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Profil mis à jour avec succès");
          navigation.goBack();
        } else {
          console.error(
            "Erreur lors de la mise à jour du profil. Statut :",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du profil :", error);
      });
  };

  const user = useSelector((state) => state.user.value);
  console.log(user.token);
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${authToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          const user = data.user;
          setUserData({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            adress: user.adress,
            description: user.description,
            sports: user.sports,
            ambition: user.ambition,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture,
          });

          // Mettre à jour les sports sélectionnés
          setSelectedSports(user.sports);
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
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <AntDesign name="left" size={24} color="#4A46FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userData.profilePicture || defaultImage }}
              style={styles.profileImage}
            />
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.nicknameText,
                  {
                    fontSize:
                      userData.nickname && userData.nickname.length > 10
                        ? 20
                        : 25,
                  },
                ]}
              >
                {userData.nickname}
              </Text>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={handleReview}
              >
                <Text style={styles.reviewButtonText}>Avis</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.inputContainer, { marginTop: 40 }]}>
          <Text style={styles.inputLabel}>Pseudo</Text>
          <TextInput
            style={[styles.input, styles.boldText]}
            placeholder="Pseudo"
            value={userData.nickname}
            onChangeText={(text) =>
              setUserData({ ...userData, nickname: text })
            }
            selectionColor="#4A46FF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, styles.boldText]}
            placeholder="Email"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            selectionColor="#4A46FF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.input, styles.boldText]}
            placeholder="Password"
            value={getPasswordStars()} // Utiliser la fonction getPasswordStars pour afficher les étoiles
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
            secureTextEntry={true}
            selectionColor="#4A46FF"
            editable={false} // Désactiver le champ de mot de passe
          />
          <Text style={styles.passwordMessage}>
            Pour modifier votre mot de passe, veuillez contacter
            l'administrateur.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Lieu de pratique sportive</Text>
          <TextInput
            style={[styles.input, styles.boldText]}
            placeholder="Lieu de pratique"
            value={userData.adress}
            onChangeText={(text) => setUserData({ ...userData, adress: text })}
            selectionColor="#4A46FF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
              styles.boldText,
              { textAlign: "justify" },
              { height: Math.max(80, descriptionHeight) },
            ]}
            placeholder="Description"
            value={userData.description}
            onChangeText={(text) =>
              setUserData({ ...userData, description: text })
            }
            multiline={true}
            textAlignVertical="top"
            onContentSizeChange={(event) =>
              setDescriptionHeight(event.nativeEvent.contentSize.height)
            }
            selectionColor="#4A46FF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Choix du sport</Text>
        </View>
        <View style={styles.sportIconsContainer}>
          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedSports.Football
                ? { backgroundColor: "#4A46FF", borderRadius: 12 }
                : null,
            ]}
            onPress={() => handleAddSport("Football")}
          >
            <View
              style={[
                styles.iconFoot,
                {
                  backgroundColor: selectedSports.Football
                    ? "#4A46FF"
                    : "white",
                  borderRadius: 12,
                  width: 65,
                  height: 69,
                },
              ]}
            >
              <Foot fill={selectedSports.Football ? "white" : "black"} />
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                selectedSports.Football
                  ? { backgroundColor: "white", elevation: 3 }
                  : { backgroundColor: "#4A46FF" },
              ]}
              onPress={() => handleAddSport("Football")}
            >
              <Text
                style={[
                  styles.addButtonText,
                  selectedSports.Football
                    ? {
                        color: "#4A46FF",
                        fontSize: 25,
                        fontFamily: "Poppins_600SemiBold",
                      }
                    : null,
                ]}
              >
                {selectedSports.Football ? "-" : "+"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedSports.Basketball
                ? { backgroundColor: "#4A46FF", borderRadius: 12 }
                : null,
            ]}
            onPress={() => handleAddSport("Basketball")}
          >
            <View
              style={[
                styles.iconBasket,
                {
                  backgroundColor: selectedSports.Basketball
                    ? "#4A46FF"
                    : "white",
                  borderRadius: 12,
                  width: 65,
                  height: 69,
                },
              ]}
            >
              <Basket fill={selectedSports.Basketball ? "white" : "black"} />
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                selectedSports.Basketball
                  ? { backgroundColor: "white", elevation: 3 }
                  : { backgroundColor: "#4A46FF" },
              ]}
              onPress={() => handleAddSport("Basketball")}
            >
              <Text
                style={[
                  styles.addButtonText,
                  selectedSports.Basketball
                    ? {
                        color: "#4A46FF",
                        fontSize: 25,
                        fontFamily: "Poppins_600SemiBold",
                      }
                    : null,
                ]}
              >
                {selectedSports.Basketball ? "-" : "+"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedSports.Running
                ? { backgroundColor: "#4A46FF", borderRadius: 12 }
                : null,
            ]}
            onPress={() => handleAddSport("Running")}
          >
            <View
              style={[
                styles.iconRunning,
                {
                  backgroundColor: selectedSports.Running ? "#4A46FF" : "white",
                  borderRadius: 12,
                  width: 65,
                  height: 69,
                },
              ]}
            >
              <Running fill={selectedSports.Running ? "white" : "black"} />
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                selectedSports.Running
                  ? { backgroundColor: "white", elevation: 3 }
                  : { backgroundColor: "#4A46FF" },
              ]}
              onPress={() => handleAddSport("Running")}
            >
              <Text
                style={[
                  styles.addButtonText,
                  selectedSports.Running
                    ? {
                        color: "#4A46FF",
                        fontSize: 25,
                        fontFamily: "Poppins_600SemiBold",
                      }
                    : null,
                ]}
              >
                {selectedSports.Running ? "-" : "+"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedSports.Tennis
                ? { backgroundColor: "#4A46FF", borderRadius: 12 }
                : null,
            ]}
            onPress={() => handleAddSport("Tennis")}
          >
            <View
              style={[
                styles.iconTennis,
                {
                  backgroundColor: selectedSports.Tennis ? "#4A46FF" : "white",
                  borderRadius: 12,
                  width: 65,
                  height: 69,
                },
              ]}
            >
              <Tennis fill={selectedSports.Tennis ? "white" : "black"} />
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                selectedSports.Tennis
                  ? { backgroundColor: "white", elevation: 3 }
                  : { backgroundColor: "#4A46FF" },
              ]}
              onPress={() => handleAddSport("Tennis")}
            >
              <Text
                style={[
                  styles.addButtonText,
                  selectedSports.Tennis
                    ? {
                        color: "#4A46FF",
                        fontSize: 25,
                        fontFamily: "Poppins_600SemiBold",
                      }
                    : null,
                ]}
              >
                {selectedSports.Tennis ? "-" : "+"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ambition</Text>
          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
              styles.boldText,
              { textAlign: "justify" },
              { height: Math.max(60, ambitionHeight) },
            ]}
            placeholder="Ambition"
            value={userData.ambition}
            onChangeText={(text) =>
              setUserData({ ...userData, ambition: text })
            }
            multiline={true}
            textAlignVertical="top"
            onContentSizeChange={(event) =>
              setAmbitionHeight(event.nativeEvent.contentSize.height)
            }
            selectionColor="#4A46FF"
          />
        </View>

        <View style={styles.inputContainerPhotos}>
          <Text style={styles.inputLabel}>
            Photo de profile et de couverture
          </Text>

          <View style={styles.profileImagesContainer}>
            <Image
              source={{ uri: userData.coverPicture || defaultImage }}
              style={styles.profileCover}
            />
            <TouchableOpacity
              style={styles.addButtonCover}
              onPress={uploadCover}
            >
              <Text style={styles.addButtonTextImages}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileImagesContainer}>
            <Image
              source={{ uri: userData.profilePicture || defaultImage }}
              style={styles.profileImageBottom}
            />
            <TouchableOpacity
              style={styles.addButtonProfile}
              onPress={uploadProfile}
            >
              <Text style={styles.addButtonTextImages}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "white" }]}
            onPress={() => handleLogOut()}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    marginTop: "20%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButtonContainer: {
    marginLeft: 20,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
    marginRight: 20,
  },

  nicknameText: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
  },

  reviewButton: {
    borderWidth: 1,
    borderColor: "#4A46FF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  reviewButtonText: {
    color: "#4A46FF",
    textAlign: "center",
  },

  //Inputs
  inputContainer: {
    width: "80%",
    marginHorizontal: 0,
    marginTop: 20,
    alignSelf: "center",
  },

  inputLabel: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 17,
    paddingVertical: 10,
    width: "100%",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 14,
  },

  multilineInput: {
    paddingTop: 10,
  },

  passwordMessage: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular_Italic",
    left: 10,
    marginTop: 5,
  },

  //Bouton pour icones sports
  addButton: {
    position: "absolute",
    bottom: -5,
    left: 45,
    backgroundColor: "#4A46FF",
    width: 22,
    height: 22,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  addButtonText: {
    color: "white",
    fontSize: 25,
    bottom: 5,
  },

  //Icones sports
  sportIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "80%",
  },

  iconFoot: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "30%",
    height: 69,
    borderRadius: 12,
  },

  iconBasket: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "30%",
    height: 69,
    borderRadius: 12,
  },

  iconRunning: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "30%",
    height: 69,
    borderRadius: 12,
  },

  iconTennis: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "30%",
    height: 69,
    borderRadius: 12,
  },

  //Photo cover + profil bas
  inputContainerPhotos: {
    width: "80%",
    marginHorizontal: 0,
    marginTop: 20,
    alignSelf: "center",
  },

  profileCover: {
    width: "100%",
    height: 182,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 15,
  },

  profileImageBottom: {
    width: 140,
    height: 140,
    borderRadius: 80,
    borderColor: "#F4F4F4",
    bottom: 70,
    alignSelf: "center",
    position: "relative",
    borderWidth: 4,
  },

  addButtonCover: {
    position: "absolute",
    top: 165,
    left: 285,
    backgroundColor: "#4A46FF",
    width: 25,
    height: 25,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  addButtonProfile: {
    position: "absolute",
    bottom: 100,
    left: 180,
    backgroundColor: "#4A46FF",
    width: 25,
    height: 25,
    borderRadius: 30,
    alignItems: "center",
    color: "white",
  },

  addButtonTextImages: {
    color: "white",
    fontSize: 28,
    bottom: 5,
    alignItems: "center",
  },

  // Boutons pied de page
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },

  button: {
    width: "85%",
    height: 53,
    backgroundColor: "#4A46FF",
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  logoutText: {
    color: "#FF0000",
    textAlign: "center",
  },
});

export default EditProfileScreen;
