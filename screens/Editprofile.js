import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const EditProfileScreen = () => {
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
    // Logique de mise à jour du profil

    if (
      pseudo !== '' ||
      email !== '' ||
      password !== '' ||
      lieuPratique !== '' ||
      description !== '' ||
      choixSport !== '' ||
      ambition !== '' ||
      photoProfil !== '' ||
      photoCouverture !== ''
    ) {
      setMessage('Veuillez enregistrer vos modifications.');
    } else {
      setMessage('Profil mis à jour avec succès !');
    }
  };

  const handleLogout = () => {
    // Logique de déconnexion, rediriger vers la page d'accueil
    // Exemple : navigation.navigate('Accueil');
    console.log('Déconnexion...');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Pseudo"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Email"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Password"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
       <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Lieu de pratique"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
       <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Description"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
       <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Choix du sport"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Ambition"
        onChangeText={(text) => {
          setPseudo(text);
          setMessage('');
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Valider les modifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 300,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  logoutText: {
    backgroundColorolor: 'red',
    textDecorationLine: 'underline',
  },
});

export default EditProfileScreen;
