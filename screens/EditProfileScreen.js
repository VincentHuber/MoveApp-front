import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_300Light } from '@expo-google-fonts/poppins';
import Foot from '../assets/foot.js';
import Basket from '../assets/basket.js';
import Running from '../assets/running.js';
import Tennis from '../assets/tennis.js';

import { useSelector } from 'react-redux';

// Adresse du backend
const BACKEND_ADDRESS = 'http://192.168.10.124:3000';


const EditProfileScreen = () => {

//const pour ajuster taille inputs de manière dynamique 
const [descriptionHeight, setDescriptionHeight] = useState(0);
const [ambitionHeight, setAmbitionHeight] = useState(0);

  const authToken = useSelector(state => state.user.value.token);

// Logique pour gérer l'interaction avec le bouton "Avis"
  const handleReview = () => {
    console.log('Bouton Avis cliqué');
};
 
    const [selectedSports, setSelectedSports] = useState({
        Football: false,
        Basketball: false,
        Running: false,
        Tennis: false,
    });

    const handleAddSport = (sport) => {
        setSelectedSports(prevState => ({
            ...prevState,
            [sport]: !prevState[sport],
        }));
    };

    const navigation = useNavigation();
    
    const [userData, setUserData] = useState({
        nickname: '',
        email: '',
        password: '',
        adress: '',
        description: '',
        sports: '',
        ambition: '',
        coverPicture: '',
        profilePicture: '',
        message: '',
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
      // Trouver champs modifiés
      const updatedFields = {};
      for (const key in userData) {
        if (userData[key] !== '') {
          updatedFields[key] = userData[key];
        }
      }
      console.log('Champs mis à jour :', updatedFields);

      console.log("authToken => ", authToken);

      const tokenTest2 = "BzDXT_ZEUOMIu4eNerbF-g9-mjDxZO45"

      fetch(`${BACKEND_ADDRESS}/user/updateProfile/${tokenTest2}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields), 
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            console.log('Profil mis à jour avec succès');
        } else {
            console.error('Erreur lors de la mise à jour du profil', data.error);
        }
    });
  };

  const BACKEND_ADDRESS = 'http://192.168.10.124:3000';
  const tokenTest = "BzDXT_ZEUOMIu4eNerbF-g9-mjDxZO45"
  const user = useSelector((state) => state.user.value);
  console.log(user.token)
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${tokenTest}`)
      .then(response => response.json())
      .then(data => {
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
        } else {
          console.error('Aucun utilisateur trouvé.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      });
}, []);
  
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
           
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
            
            <View style={styles.profileImageContainer}>
              <Image
                  source={{ uri: userData.profilePicture }}
                  style={styles.profileImageTop}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.pseudoText, { fontSize: userData.nickname && userData.nickname.length > 10 ? 20 : 25 }]}>
                    {userData.nickname}
                </Text>
                <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('ReviewScreen')}>
                    <Text style={styles.reviewText}>.</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pseudo</Text>
                <TextInput
                    style={[styles.input, styles.boldText]}
                    placeholder="Pseudo"
                    value={userData.nickname}
                    onChangeText={(text) => setUserData({ ...userData, nickname: text })}
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
                    value={userData.password}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                    secureTextEntry={true}
                    selectionColor="#4A46FF"
                />
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
                  style={[styles.input, styles.multilineInput, styles.boldText, { textAlign: 'justify' }, { height: Math.max(80, descriptionHeight) }]}
                  placeholder="Description"
                  value={userData.description}
                  onChangeText={(text) => setUserData({ ...userData, description: text })}
                  multiline={true}
                  textAlignVertical="top"
                  onContentSizeChange={(event) => setDescriptionHeight(event.nativeEvent.contentSize.height)}
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
                        selectedSports.Football ? { backgroundColor: '#4A46FF', borderRadius: 12} : null
                    ]}
                    onPress={() => handleAddSport('Football')}>
                    <View style={[styles.iconFoot, {backgroundColor: selectedSports.Football ? '#4A46FF' : 'white', borderRadius: 12, width: 65, height: 69}]}>
                        <Foot fill={selectedSports.Football ? 'white' : 'black'} />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddSport('Football')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        styles.iconContainer, 
                        selectedSports.Basketball ? { backgroundColor: '#4A46FF', borderRadius: 12 } : null
                    ]}
                    onPress={() => handleAddSport('Basketball')}>
                    <View style={[styles.iconBasket, {backgroundColor: selectedSports.Basketball ? '#4A46FF' : 'white', borderRadius: 12, width: 65, height: 69}]}>
                        <Basket fill={selectedSports.Basketball ? 'white' : 'black'} />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddSport('Basketball')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        styles.iconContainer, 
                        selectedSports.Running ? { backgroundColor: '#4A46FF', borderRadius: 12 } : null
                    ]}
                    onPress={() => handleAddSport('Running')}>
                    <View style={[styles.iconRunning, {backgroundColor: selectedSports.Running ? '#4A46FF' : 'white', borderRadius: 12, width: 65, height: 69}]}>
                        <Running fill={selectedSports.Running ? 'white' : 'black'} />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddSport('Running')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        styles.iconContainer, 
                        selectedSports.Tennis ? { backgroundColor: '#4A46FF', borderRadius: 12} : null
                    ]}
                    onPress={() => handleAddSport('Tennis')}>
                    <View style={[styles.iconTennis, {backgroundColor: selectedSports.Tennis ? '#4A46FF' : 'white',  borderRadius: 12, width: 65, height: 69}]}>
                        <Tennis fill={selectedSports.Tennis ? 'white' : 'black'} />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddSport('Tennis')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ambition</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput, styles.boldText, { textAlign: 'justify' }, { height: Math.max(110, ambitionHeight) }]}
                  placeholder="Ambition"
                  value={userData.ambition}
                  onChangeText={(text) => setUserData({ ...userData, ambition: text })}
                  multiline={true}
                  textAlignVertical="top"
                  onContentSizeChange={(event) => setAmbitionHeight(event.nativeEvent.contentSize.height)}
                  selectionColor="#4A46FF"
                />
            </View>
          
            <View style={styles.inputContainerPhotos}>
                <Text style={styles.inputLabel}>Photo de profile et de couverture</Text>
                
                <View style={styles.profileImagesContainer}>
                  <Image source={{ uri: userData.coverPicture }} style={styles.profileCover} />
                  <TouchableOpacity style={styles.addButtonCover} onPress={uploadCover}>
                   <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.profileImagesContainer}>
                  <Image source={{ uri: userData.profilePicture }} style={styles.profileImageBottom} />
                  <TouchableOpacity style={styles.addButtonProfile} onPress={uploadProfile}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  
//Bouton retour en arrière
backButton: {
  position: 'absolute',
  top: 90,
  left: 20,
  Index: 1,
},

backButtonText: {
  color: '#4A46FF',
  fontSize: 16,
  fontFamily: 'Poppins_400Regular',
},

//pseudo + image 
profileImageContainer: {
  marginTop: 25,
  alignItems: 'center',
},
  
profileImageTop: {
  width: 100,
  height: 100,
  borderRadius: 75,
  borderWidth: 4,
  borderColor: 'white',
  marginTop: 40,
  right: 50,
},

pseudoText: {
  position: 'absolute',
  left: 20,
  bottom: 0,
  color: 'black',
  paddingVertical: 50,
  fontFamily: 'Poppins_700Bold',
  fontSize: 28,
},

//Inputs 
inputContainer: {
  width: '80%',
  marginHorizontal: 0,
  marginTop: 20,
  alignSelf: "center",
  borderWidth: 2,
},

inputLabel: {
  fontSize: 16,
  fontFamily: 'Poppins_400Regular',
},

input: {
  backgroundColor: 'white',
  borderRadius: 10,
  height: 60,
  paddingHorizontal: 10,
  width: "100%",
  fontFamily: 'Poppins_700Bold',
  fontSize: 14,
},

// inputArea: {
//   backgroundColor: 'white',
//   borderRadius: 10,
//   height: 90,
//   paddingHorizontal: 10,
//   width: "100%",
//   fontFamily: 'Poppins_700Bold',
//   fontSize: 14,
//   paddingBottom: 35,
// },

boldText: {
  fontWeight: 'bold',
  fontSize: 14,
},

multilineInput: {
  paddingTop: 10, 
},

//Bouton avis
reviewText: {
  color: '#4A46FF',
  textAlign: 'center',
  marginBottom: 10,
},

//Bouton pour icones sports
addButton: {
  position: 'absolute',
  bottom: -5,
  left: 45,
  backgroundColor: '#4A46FF',
  width: 22,
  height: 22,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
},

addButtonText: {
  color: 'white',
  fontSize: 25,
  bottom: 5,
},

//Icones sports
sportIconsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignSelf: 'center',
  borderWidth: 2,
  width: '80%',
},

iconFoot: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "white",
  width: '30%', 
  height: 69,
  borderRadius: 12,
},

iconBasket: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "white",
  width: '30%', 
  height: 69,
  borderRadius: 12,
},

iconRunning: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "white",
  width: '30%', 
  height: 69,
  borderRadius: 12,
},

iconTennis: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "white",
  width: '30%', 
  height: 69,
  borderRadius: 12,
},

//Photo cover + profil bas
inputContainerPhotos: {
width: '80%',
marginHorizontal: 0,
marginTop: 20,
alignSelf: "center",
borderWidth: 2,
}, 

profileCover: {
  width: '100%',
  backgroundColor: 'white',
  height: 182,
  borderRadius: 10,
  justifyContent: 'center',
  paddingLeft: 15,
},

profileImageBottom: {
  width: 120, 
  height: 120, 
  borderRadius: 60, 
  borderWidth: 4,
  borderColor: 'white',
  bottom: 70, 
  alignSelf: 'center',
  position: 'relative',
},

addButtonCover:{
  position: 'absolute',
  top: 170,
  right: 0,
  backgroundColor: '#4A46FF',
  width: 22,
  height: 22,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
},

addButtonProfile:{
  position: 'absolute',
  top: 20, 
  left: 180, 
  backgroundColor: '#4A46FF',
  width: 22, 
  height: 22, 
  borderRadius: 30, 
  alignItems: 'center',
  color: 'white',
},

// Boutons pied de page
buttonContainer: {
  width: '100%',
  marginTop: 10,
  alignItems: 'center',
},

button: {
  width : '85%',
  height: 53,
  backgroundColor: '#4A46FF',
  padding: 15,
  borderRadius: 40,
  marginBottom: 10,
  alignItems: 'center',
},

buttonText: {
  color: '#ffffff',
  textAlign: 'center',
  fontSize: 16,
  fontFamily: 'Poppins_600SemiBold',
 },

logoutText: {
  color: '#FF0000',
  textAlign: 'center',
 },
});

export default EditProfileScreen;
