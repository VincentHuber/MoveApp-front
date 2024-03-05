import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
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
    // Logique de mise à jour du profil, si 1 seule modif apportée = obligation d'enregistrer

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
    // redirection vers page d'accueil (il faudra modifier le chemin pour la page d'accueil)
    window.location.href = './HomeScreen'; 
    console.log('Déconnexion...');
  };

  const handleGoBack = () => {
    navigation.goBack(); // revenir en arrière
  };

  const handleProfilePress = () => {
    navigation.navigate('NomDeVotreProfil'); // bouton pour l'accès au profil (quand on clique sur notre photo de profil)
  };

  const handleReviewPress = () => {
    navigation.navigate('Avis'); //navigation vers page 'Avis'
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
    
    <View style={styles.container}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={require('./chemin/vers/votre/photo/profil')} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReviewPress}>
          <Text style={styles.reviewText}>Donner un avis</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Valider les modifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.backText}>Retourner en arrière</Text>
          </TouchableOpacity>
        </View>
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
