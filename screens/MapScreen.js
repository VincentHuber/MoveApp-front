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

const BACKEND_ADDRESS = "http://192.168.84.75:3000";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [usersWithCoordinates, setUsersWithCoordinates] = useState([]);

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
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  // fonction pour afficher les users sur la Map via leurs adresses
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user.token) {
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

  const handleSearch = async () => {
    let results = await Location.geocodeAsync(searchText);
    if (results.length > 0) {
      setRegion({
        latitude: results[0].latitude,
        longitude: results[0].longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
    setSearchText("");
  };

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

  // fonction qui gèree l'affichage de la modale lors du 'click'
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

  const handleModif = () => {
    navigation.navigate("EditProfile");
    setModalVisible(false);
  };

  const handle2Modif = () => {
    const updateMatch = "";

    fetch(`${BACKEND_ADDRESS}/user/match/${user.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMatch),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Profil mis à jour avec succès");
        } else {
          console.error("Erreur lors de la mise à jour du profil", data.error);
        }
      });

    navigation.navigate("Chat");
    setModal2Visible(false);
  };

  const handleReviews = () => {
    //navigation.navigate('Review');
    setModalVisible(false);
  };

  const handle2Reviews = () => {
    //navigation.navigate('Review');
    setModalMarkerVisible(false);
  };

  const handleChat = () => {
    navigation.navigate("Chat");
  };

  const handleReturnToLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setSearchText("");
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
          <View style={styles.buttonLocation}>
            <TouchableOpacity
              style={getButtonStyle("position")}
              onPress={handleReturnToLocation}
            >
              <Position />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Votre recherche"
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
        </View>

        <View style={styles.containerMessage}>
          <TouchableOpacity style={styles.message} onPress={() => handleChat()}>
            <Message/>
          </TouchableOpacity>
        </View>

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
      </SafeAreaView>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              onPress={() => handleClose()}
              style={styles.modalClose}
            >
              <Image
                source={require("../assets/close.png")}
                style={{ width: 48, height: 48, borderRadius: 57 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <Image
              style={styles.photoCoverModal}
              source={{ uri: userInfo.coverPicture }}
            />
            <Image
              style={styles.photoProfilModal}
              source={{ uri: userInfo.profilePicture }}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={styles.textModal1}>{userInfo.nickname}</Text>
              <TouchableOpacity
                onPress={() => handleReviews()}
                style={styles.boutonAvis}
              >
                <Image
                  source={require("../assets/noteAvis.png")}
                  style={{ width: 65, height: 22 }}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textModal2}>{userInfo.description}</Text>
            <Text style={styles.textSports}>MES SPORTS</Text>
            <View style={styles.sportContainer}>
              {Object.keys(userInfo.sports)
                .filter((sport) => userInfo.sports[sport])
                .map((sport, index) => {
                  const SportIcon = sportsLogos[sport];
                  return (
                    <View key={index} style={styles.sport}>
                      <SportIcon style={styles.sportIcon} />
                    </View>
                  );
                })}
            </View>

            {/* <Text style={styles.textambition}>MON AMBITION </Text>
            <Text style={styles.textModal3}>{userInfo.ambition}</Text>
             */}
          </View>
          <TouchableOpacity
            onPress={() => handleModif()}
            style={styles.frameChat}
            activeOpacity={0.8}
          >
            <Image
              source={require("../assets/boutonModifier.png")}
              style={{ width: 181, height: 53, borderRadius: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={modalMakerVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              onPress={() => handleClose()}
              style={styles.modalClose}
            >
              <Image
                source={require("../assets/close.png")}
                style={{ width: 48, height: 48, borderRadius: 57 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <Image
              style={styles.photoCoverModal}
              source={{ uri: usersInfo.coverPicture }}
            />
            <Image
              style={styles.photoProfilModal}
              source={{ uri: usersInfo.profilePicture }}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={styles.textModal1}>{usersInfo.nickname}</Text>
              <TouchableOpacity
                onPress={() => handleReviews()}
                style={styles.boutonAvis}
              >
                <Image
                  source={require("../assets/noteAvis.png")}
                  style={{ width: 65, height: 22 }}
                />
              </TouchableOpacity>
            </View>

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
            {/* <Text style={styles.textambition}>SON AMBITION </Text>
            <Text style={styles.textModal3}>{usersInfo.ambition}</Text> */}
          </View>

          <TouchableOpacity
            onPress={() => handleModif()}
            style={styles.frameChat}
            activeOpacity={0.8}
          >
            <Image
              source={require("../assets/frameChat.jpg")}
              style={{ width: 181, height: 53, borderRadius: 40 }}
            />
          </TouchableOpacity>
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
    flexDirection: "row",
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    marginLeft: 15,
    height: 57,
    borderColor: "#FFFFFF",
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
    textAlign: "center",
  },

  // icon image perso

  modalProfil: {
    bottom: 5,
    right: 55,
  },

  buttonLocation: {
    alignItems: "center",
    bottom: 6,
    left: 60,
    zIndex: 1,
  },

  // icon chat Map
  containerMessage: {
    backgroundColor: "#FFFFFF",
    borderRadius: 57,
    marginTop: "87%",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    left: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  message: {
    justifyContent: "center",
    alignItems: "center",
    width: 78,
    height: 77,
  },

  

  // icon sports container
  containerIcons: {
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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

  // icon position geolocalisation
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
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    borderWidth: 1,
    backgroundColor: "#f4f4f4",
    maxHeight: "85%",
    width: "85%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
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
    position: "absolute",
    borderWidth: 2,
    top: 10,
    width: "100%",
    alignItems: "center",
  },

  photoCoverModal: {
    borderWidth: 2,
    width: "90%",
    height: "30%",
    borderRadius: 13,
  },

  photoProfilModal: {
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: "-18%",
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#F4F4F4",
  },

  infosUser: {
    textAlign: "center",
    borderWidth: 1,
    width: 230,
    bottom: "10%",
    flexDirection: "row",
  },

  textModal1: {
    borderWidth: 2,
    textAlign: "center",
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },

  textModal2: {
    borderWidth: 2,
    width: "80%",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_400Regular_Italic",
  },

  textSports: {
    borderWidth: 2,
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },

  sportContainer: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },

  sportIcon: {
    borderWidth: 2,
    marginRight: 90,
  },

  sport: {
    borderWidth: 2,
    backgroundColor: "white",
    height: 63,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  textambition: {
    borderWidth: 2,
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },

  textModal3: {
    borderWidth: 2,
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_400Regular_Italic",
  },

  closeContainer: {
    borderWidth: 2,
    zIndex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end", // Aligner le contenu à la fin du conteneur (à droite pour flexDirection: 'row')
    padding: 10,
  },

  modalClose: {
    marginBottom: -40,
    borderWidth: 2,
  },

  boutonAvis: {
    borderWidth: 2,
    borderRadius: 50,
  },

  frameChat: {
    height: 65,
    borderWidth: 2,
    padding: 10,
    marginTop: -40,
  },
});
