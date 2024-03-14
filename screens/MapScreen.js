import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";

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
import Message from "../assets/message.js";
import Position from "../assets/position.js";
import Close from "../assets/close.js";

const BACKEND_ADDRESS = "http://192.168.10.149:3000";

export default function MapScreen({ navigation }) {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [usersWithCoordinates, setUsersWithCoordinates] = useState([]);

  const [updateMatch, setUpdateMatch] = useState(null)

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState("");

  // pour le user qui est logger
  const [userInfo, setUserInfo] = useState({
    name: "",
    description: "",
    ambition: "",
    profilePicture: "",
    coverPicture: "",
    sports: "",
  });

  // pour tout les users
  const [usersInfo, setUsersInfo] = useState({
    name: "",
    description: "",
    ambition: "",
    profilePicture: "",
    coverPicture: "",
    sports: "",
  });

  // État pour la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMakerVisible, setModalMarkerVisible] = useState(false);

  // État pour refléter le sport actif
  //const [activeButton, setActiveButton] = useState(null);
  const [activeSport, setActiveSport] = useState(null);

  // variable pour affaicher les logos des sports dans la modal
  const sportsLogos = {
    Football: Foot,
    Basketball: Basket,
    Running: Running,
    Tennis: Tennis,
  };

  //  Redirect to /login if not logged in
  useEffect(() => {
    if (!user.token) {
      console.log('hello');
      navigation.navigate("Home");
    }
  }, [user, navigation]);


  // fonction pour afficher les users sur la Map via leurs adresses
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user.token) {
        console.log('usertoken :', user.token)
        console.error("Token de l'utilisateur non disponible.");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_ADDRESS}/users`);
        const userData = await response.json();

        if (!userData.result || !Array.isArray(userData.users)) {
          console.error(
            "Les données récupérées depuis le backend ne sont pas un tableau."
          );
          return;
        }

        const usersWithCoordinatesPromises = userData.users.map(
          async (user) => {
            try {
              const address = user.adress;
              const geoResponse = await fetch(
                `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
                  address
                )}`
              );
              const geoData = await geoResponse.json();

              if (geoData.features.length > 0) {
                const coordinates = {
                  latitude: geoData.features[0].geometry.coordinates[1],
                  longitude: geoData.features[0].geometry.coordinates[0],
                };
                return { ...user, coordinates };
              }
              return null;
            } catch (error) {
              console.error(
                `Erreur lors du géocodage de l'adresse ${user.adress}:`,
                error
              );
              return null;
            }
          }
        );

        const filteredUsersWithCoordinates = (
          await Promise.all(usersWithCoordinatesPromises)
        ).filter(Boolean);
        setUsersWithCoordinates(filteredUsersWithCoordinates);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs depuis le backend:",
          error
        );
      }
    };

    fetchUsers();
  }, [user.token]); // fin de la fonction pour afficher les users sur la Map via leurs adresses

  // Fonction pour télécharger une image de couverture
  const uploadCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setCover(result.assets[0].uri);
    }
  };

  // Fonction pour télécharger une image de profil
  const uploadProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfile(result.assets[0].uri);
    }
  };

  // Fonction pour gérer le sport comme le sport actif
  const handlePress = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };

  // Fonction qui modifie la couleur du bouton au click
  const getButtonStyle = (sport) => {
    return activeSport === sport ? styles.activeIcon : styles.icon;
  };

  const handleClose = () => {
    setModalVisible(false);
    setModalMarkerVisible(false);
  };

  //Geolocalisation
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

// trouver une ville
  const handleSearch = async () => {
    let results = await Location.geocodeAsync(searchText);
    if (results.length > 0) {
      setRegion({
        latitude: results[0].latitude,
        longitude: results[0].longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSearchText("")
    }
  };

  //afficher l'utilisateur dans la page map
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //console.log(data);

          setUserInfo((prevState) => ({
            ...prevState,
            profilePicture: data.user.profilePicture,
          }));
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données", error)
      );
  }, []);

  // image par défaut au cas ou il n'y pas d'image trouvée
  const defaultImage = "../assets/imagePerso.png";

// Modal au clic sur la photo de profil de l'utilisateur
  const handleModal = () => {
    fetch(`${BACKEND_ADDRESS}/user/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //console.log(data);
          const user = data.user;
          setUserInfo({
            nickname: user.nickname,
            description: user.description,
            ambition: user.ambition,
            sports: user.sports,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture,
          });
          setModalVisible(true);
          setModalMarkerVisible(false);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
  };

  // Modal au clic qui affiche les markers des autres utilisateurs
  const onMarkerPress = (user) => {
    setUsersInfo({
      nickname: user.nickname,
      description: user.description,
      ambition: user.ambition,
      coverPicture: user.coverPicture,
      profilePicture: user.profilePicture,
      sports: user.sports,
    });

    setModalMarkerVisible(true);
    setModalVisible(false);
  };

  //Action pour modifier le profil
  const handleModif = () => {
    navigation.navigate("EditProfile");
    setModalVisible(false);
  };


//Action pour aller dans le chat
  const handleFrameChat = (data) => {

      const newMatch= data.token
    
    fetch(`${BACKEND_ADDRESS}/user/match/${user.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newMatch}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Profil mis à jour avec succès");

        } else {
          console.error("Erreur lors de la mise à jour du profil", data.error);
        }
      });

      navigation.navigate("Chat", {otherToken: data.token});
      setModalMarkerVisible(false)

  };


  const handleReviews = () => {
    //navigation.navigate('Review');
    setModalVisible(false);
  };

  const handle2Reviews = () => {
    //navigation.navigate('Review');
    setModalMarkerVisible(false);
  };

  //action pour aller au menu de chat via la map
  const handleChat = () => {
    navigation.navigate("Chat");
  };

  //action pour retourner à sa position
  const handleReturnToLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setSearchText("")
  };

  //Fonts
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
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {region && (
          <MapView style={styles.map} region={region}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <View style={styles.blueDot} />
              </Marker>
            )}

            {Array.isArray(usersWithCoordinates) &&
              usersWithCoordinates
                .filter((user) => !activeSport || user.sports[activeSport]) // Filtrer les utilisateurs par le sport actif
                .map((user, index) => (
                  <Marker
                    key={index}
                    coordinate={user.coordinates}
                    onPress={() => onMarkerPress(user)}
                    //tracksViewChanges={true}
                  >
                    <Image
                      source={{ uri: user.profilePicture }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        borderBottomWidth: 3,
                        borderColor: "white",
                      }}
                    />
                  </Marker>
                ))}
          </MapView>
        )}

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="votre recherche"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity
            onPress={() => handleModal()}
            style={styles.modalProfil}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: userInfo.profilePicture || defaultImage }}
              style={{ width: 48, height: 48, borderRadius: 57 }}
            />
          </TouchableOpacity>

          <View style={styles.buttonLocation}>
            <TouchableOpacity
              style={getButtonStyle("position")}
              onPress={() => handleReturnToLocation("position")}
            >
              <Position />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.message} onPress={() => handleChat()}>
          <Message />
        </TouchableOpacity>

        <View style={styles.containerIcons}>
          <TouchableOpacity
            style={getButtonStyle("Football")}
            onPress={() => handlePress("Football")}
          >
            <Foot />
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle("Running")}
            onPress={() => handlePress("Running")}
          >
            <Running />
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle("Basketball")}
            onPress={() => handlePress("Basketball")}
          >
            <Basket />
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle("Tennis")}
            onPress={() => handlePress("Tennis")}
          >
            <Tennis />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.profileImagesContainer}>
                  <Image
                    style={styles.photoCoverModal}
                    source={{ uri: userInfo.coverPicture }}
                  />
                  <Image
                    style={styles.photoProfilModal}
                    source={{ uri: userInfo.profilePicture }}
                  />
                  </View>
                <View style={styles.infosUser}>
                  <Text style={styles.textModal1}>{userInfo.nickname}</Text>
                  <TouchableOpacity
                    onPress={() => handleReviews()}
                    style={styles.boutonAvis}
                  >
                    <Text style={{width:50, borderWidth:3}}>avis</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.textModal2}>{userInfo.description}</Text>
                <Text style={styles.textSports}>MES SPORTS </Text>
                <View style={styles.sportContainer}>
                  {Object.keys(userInfo.sports)
                    .filter((sport) => userInfo.sports[sport]) // Ne garde que les sports pratiqués (valeur à true)
                    .map((sport, index) => {
                      const SportIcon = sportsLogos[sport]; // Récupère le composant de logo correspondant
                      return (
                        <View key={index} style={styles.sport}>
                          <SportIcon style={styles.sportIcon} />
                        </View>
                      );
                    })}
                </View>
                <Text style={styles.textambition}>MON AMBITION </Text>
                <Text style={styles.textModal3}>{userInfo.ambition}</Text>
              </View>

              <View style={styles.modalClose}>
                <TouchableOpacity onPress={handleClose}>
                  <View style={styles.circle}>
                    <View style={styles.cross}></View>
                    <View style={[styles.cross, styles.crossVertical]}></View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleModif()}
                  style={styles.frameChat}
                  activeOpacity={0.8}
                >
                  <Image source={require("../assets/boutonModifier.jpg")} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal visible={modalMakerVisible} animationType="fade" transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.photoCoverModal}
                  source={{ uri: usersInfo.coverPicture }}
                />
                <Image
                  style={styles.photoProfilModal}
                  source={{ uri: usersInfo.profilePicture }}
                />
                <Text style={styles.textModal1}>{usersInfo.nickname}</Text>
                <Text style={styles.textModal2}>{usersInfo.description}</Text>
                <Text style={styles.textSports}>SES SPORTS</Text>
                <View style={styles.sportContainer}>
                  {Object.keys(usersInfo.sports)
                    .filter((sport) => usersInfo.sports[sport]) // Ne garde que les sports pratiqués (valeur à true)
                    .map((sport, index) => {
                      const SportIcon = sportsLogos[sport]; // Récupère le composant de logo correspondant
                      return (
                        <View key={index} style={styles.sport}>
                          <SportIcon style={styles.sportIcon} />
                        </View>
                      );
                    })}
                </View>
                <Text style={styles.textambition}>SON AMBITION </Text>
                <Text style={styles.textModal3}>{usersInfo.ambition}</Text>
              </View>

              <View style={styles.modalClose}>
                <TouchableOpacity
                  style={getButtonStyle("close")}
                  onPress={() => handleClose("close")}
                >
                  <Close />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleReviews()}
                  style={styles.boutonAvis}
                >
                  <Image source={require("../assets/boutonAvis.jpg")} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleFrameChat(updateMatch)}
                  style={styles.frameChat}
                  activeOpacity={0.8}
                >
                  <Image source={require("../assets/frameChat.jpg")} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  keyboardAvoidingView: {
    height: "100%",
    width: "100%",
  },

  // Map
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Input recherche
  searchContainer: {
    //position: "absolute",
    top: 20,
    width: "100%",
    alignItems: "center",
    // zIndex:1,
  },
  input: {
    width: "90%",
    height: 57,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 10,
    borderRadius: 90,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    textAlign: "center",
  },

  // icon position
  blueDot: {
    width: 20,
    height: 20,
    backgroundColor: "#4A46FF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    position: "absolute",
    backgroundColor: "#f4f4f4",
    height: 667,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  profileImagesContainer: {
    position: 'absolute',
    borderWidth:2,
    top: 10,
    width: '100%', 
    alignItems: 'center', 
  },

  photoCoverModal: {
    width: 340,
    height: 182,
    borderRadius: 10,
    justifyContent: 'center',
  },

  photoProfilModal: {
    bottom: "20%",
    width: 134,
    height: 134,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#F4F4F4",
  },

  infosUser: {
    textAlign:'center',
    borderWidth: 1,
    width:230,
    bottom: "10%",
    flexDirection: 'row',
  },

  textModal1: {
    textAlign:'center',
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },

  boutonAvis: {
  
  },

  textModal2: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "100%",
    fontSize: 14,
    width: 299,
    fontFamily: "Poppins_400Regular_Italic",
  },

  textSports: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "120%",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    width: 150,
    borderWidth: 1,
    left: 130,
  },

  sportContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "center",
    marginBottom: 60,
    borderWidth: 1,
    width: 350,
    top: 120,
  },

  sportIcon: {
    top: "150%",
    marginRight: 90, // Espace entre l'icône et le nom du sport
  },

  textambition: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "160%",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    width: 350,
    left: 110,
  },

  textModal3: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "170%",
    fontSize: 14,
    width: 299,
    fontFamily: "Poppins_400Regular",
  },

  modalClose: {
    position: "absolute",
    top: 50,
    right: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A46FF",
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  circle: {
    width: "50%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: 50,
  },

  frameChat: {
    position: "absolute",
    top: 650,
    right: 110,
  },

  // icon image perso
  modaluser: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 150,
    right: 150,
    width: 78,
    height: 77,
    borderRadius: 57,
    borderColor: "#F4F4F4",
  },

  modalProfil: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: "20%",
    right: "6%",
    width: 48,
    height: 48,
    borderRadius: 57,
    borderColor: "#F4F4F4",
  },

  buttonLocation: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: "20%",
    right: "82%",
    width: 48,
    height: 48,
    borderRadius: 57,
  },

  // icon chat Map
  message: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 180,
    right: 40,
    backgroundColor: "#FFFFFF",
    width: 78,
    height: 77,
    borderRadius: 57,
  },

  // icon sports container
  containerIcons: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    bottom: "2%",
    height: "12%",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 20,
  },

  //Icon sports non actives
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "24%",
    height: "24%",
    borderRadius: 12,
  },

  //Icon sports actives bleue Move
  activeIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A46FF",
    width: "24%",
    height: "90%",
    borderRadius: 12,
  },
});
