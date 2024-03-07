import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  useFonts, 
  Poppins_700Bold, 
  Poppins_600SemiBold, 
  Poppins_400Regular, 
  Poppins_400Regular_Italic, 
  Poppins_500Medium, 
  Poppins_300Light,
} from '@expo-google-fonts/poppins';

import Foot from '../assets/foot.js';
import Basket from '../assets/basket.js';
import Running from '../assets/running.js';
import Tennis from '../assets/tennis.js';

const EditProfileScreen = () => {
  const [selectedSports, setSelectedSports] = useState({
    Football: false,
    Basketball: false,
    Running: false,
    Tennis: false,
  });

  // Fonction pour gérer l'ajout ou la suppression d'un sport
  const handleAddSport = (sport) => {
    setSelectedSports(prevState => ({
      ...prevState,
      [sport]: !prevState[sport],
    }));
  };


  const navigation = useNavigation();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lieuPratique, setLieuPratique] = useState('');
  const [description, setDescription] = useState('');
  const [choixSport, setChoixSport] = useState('');
  const [ambition, setAmbition] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [photoCouverture, setPhotoCouverture] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const userData = {
      token: 'votre_token',
      nickname: pseudo,
      mail: email,
      password: password,
      address: lieuPratique,
      description: description,
      sports: selectedSports,
      ambition: ambition,
      coverPicture: photoCouverture,
      profilePicture: photoProfil
    };
  

    fetch('http://192.168.10.137:3000/updateProfile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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

  const handleLogout = () => {
    console.log('Déconnexion...');
    navigation.navigate('HomeScreen');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      
      <View style={styles.profileImageContainer}>
        <Image
          // source={{ uri: photoProfil }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.pseudoText}>{pseudo}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          value={pseudo}
          onChangeText={(text) => {
            setPseudo(text);
            setMessage('');
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setMessage('');
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setMessage('');
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Lieu de pratique sportive</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="Lieu de pratique"
          value={lieuPratique}
          onChangeText={(text) => {
            setLieuPratique(text);
            setMessage('');
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setMessage('');
          }}
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
          style={styles.inputArea}
          placeholder="Ambition"
          value={ambition}
          onChangeText={(text) => {
            setAmbition(text);
            setMessage('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Photo de profil et de couverture</Text>
        
      </View>

    
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={handleLogout}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//<Image source={require('./')} style={styles.profileImage} />

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
    zIndex: 1,
  },
  backButtonText: {
    color: '#4A46FF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },

  //pseudo + image + avis
  profileImageContainer: {
    marginTop: 25,
    marginRight: 80,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: 20,
  },
  pseudoText: {
    position: 'absolute',
    left: 145,
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

  //Bouton ajouter
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
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },

  //Photo cover + profil

  

  // Boutons pied de page
  buttonContainer: {
    width: '100%',
    marginTop: 20,
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
