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
const BACKEND_ADDRESS = 'http://192.168.10.133:3000';


const EditProfileScreen = () => {

  const authToken = useSelector(state => state.user.value.token);
    
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);

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

    const handleSubmit = () => {
      // Trouver les champs modifiés
      const updatedFields = {};
      for (const key in userData) {
        if (userData[key] !== '') {
          updatedFields[key] = userData[key];
        }
      }
      console.log('Champs mis à jour :', updatedFields);

      fetch(`${BACKEND_ADDRESS}/updateProfile/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedFields), // Utilisez les champs modifiés ici
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            console.log('Profil mis à jour avec succès');
        } else {
            console.error('Erreur lors de la mise à jour du profil:', data.error);
        }
    });
  };

    
    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/user/Feissoile/${userData.nickname}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.result && data.users.length > 0) {
                    const user = data.users[0];
                    setUserData({
                        ...userData,
                        nickname: user.nickname,
                        email: user.email,
                        password: user.password,
                        adress: user.adress,
                        description: user.description,
                        sports: user.sports,
                        ambition: user.ambition,
                        coverPicture: user.photoCouverture,
                        profilePicture: user.photoProfil,
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
                    <Text style={styles.pseudoText}>{userData.nickname}</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pseudo</Text>
                <TextInput
                    style={[styles.input, styles.boldText]}
                    placeholder="Pseudo"
                    value={userData.nickname}
                    onChangeText={(text) => setUserData({ ...userData, nickname: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={[styles.input, styles.boldText]}
                    placeholder="Email"
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
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
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Lieu de pratique sportive</Text>
                <TextInput
                    style={[styles.input, styles.boldText]}
                    placeholder="Lieu de pratique"
                    value={userData.adress}
                    onChangeText={(text) => setUserData({ ...userData, adress: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput, styles.boldText]} 
                    placeholder="Description"
                    value={userData.description}
                    onChangeText={(text) => setUserData({ ...userData, description: text })}
                    multiline={true} 
                    textAlignVertical="top" 
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
                        selectedSports.Tennis ? { backgroundColor: '#4A46FF', borderRadius: 12 } : null
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
                    style={[styles.input, styles.multilineInput, styles.boldText]} 
                    placeholder="Ambition"
                    value={userData.ambition}
                    onChangeText={(text) => setUserData({ ...userData, ambition: text })}
                    multiline={true} 
                    textAlignVertical="top"
                />
            </View>
          
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Photo de profil et de couverture</Text>
              <TouchableOpacity style={styles.addButton} onPress={uploadCover}>
                  <Text style={styles.addButtonImage}>+</Text>
              </TouchableOpacity>
              <Image
                  source={{ uri: userData.coverPicture }}
                  style={styles.coverImage}
            />

              <View style={styles.profileImageBottomContainer}>
                  <TouchableOpacity style={styles.addButton} onPress={uploadProfile}>
                      <Text style={styles.addButtonCover}>+</Text>
                  </TouchableOpacity>
                  <Image
                      source={{ uri: userData.profilePicture }}
                      style={styles.profileImageBottom}
                  />
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
  top: 100,
  left: 20,
  Index: 1,
},

backButtonText: {
  color: '#4A46FF',
  fontSize: 16,
  fontFamily: 'Poppins_400Regular',
},

//pseudo + image + avis
profileImageContainer: {
  marginTop: 25,
  alignItems: 'center',
},
  
profileImageTop: {
  width: 130,
  height: 130,
  borderRadius: 75,
  borderWidth: 4,
  borderColor: 'white',
  marginTop: 20,
  right: 50,
},

pseudoText: {
  position: 'absolute',
  left: 20,
  bottom: 12,
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
},

inputLabel: {
  fontSize: 16,
  marginBottom: 5,
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

inputArea: {
  backgroundColor: 'white',
  borderRadius: 10,
  height: 90,
  paddingHorizontal: 10,
  width: "100%",
  fontFamily: 'Poppins_700Bold',
  fontSize: 14,
  paddingBottom: 35,
},

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

//Icones sports
sportIconsContainer: {
  flexDirection: 'row',
  alignItems: 'center', 
  width: '86%',
},

iconFoot:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"white",
  width:65,
  height:69,
  borderRadius:12,
  marginHorizontal: 6,
},

iconBasket:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"white",
  width:65,
  height:69,
  borderRadius:12,
  marginHorizontal: 6,
},

iconRunning:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"white",
  width:65,
  height:69,
  borderRadius:12,
  marginHorizontal: 6,
},

iconTennis:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"white",
  width:65,
  height:69,
  borderRadius:12,
  marginHorizontal: 6,
},
addButtonText: {
  color: 'white',
  fontSize: 20,
},

//Bouton ajouter photo cover + profil
addButton: {
  position: 'absolute',
  bottom: -5,
  right: -5,
  backgroundColor: '#4A46FF',
  width: 25,
  height: 25,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
},

addButtonCover: {
  color: 'white',
  fontSize: 20,
},

addButtonImage: {
  color: 'white',
  fontSize: 20,
},

//Photo cover + profil
profileImageBottomContainer: {
  position: 'absolute',
  top: '50%',  
  left: '50%', 
  transform: [{ translateX: -65 }, { translateY: -65 }], 
},

coverImage: {
  width: '100%',
  backgroundColor: 'white',
  height: 182,
  borderRadius: 10,
  justifyContent: 'center',
  paddingLeft: 15,
  marginBottom: 13,
},

profileImageBottom: {
  width: 130,
  height: 130,
  borderRadius: 75,
  borderWidth: 4,
  borderColor: '#F4F4F4',
  backgroundColor: '#4A46FF',
  marginTop: 10,
  top: 80,
},

// Boutons pied de page
buttonContainer: {
  width: '100%',
  marginTop: 90,
  alignItems: 'center',
},

button: {
  width: '80%',
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
