import React, { useState, useEffect } from 'react';
import { View, Image, Modal, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import { useDispatch, useSelector } from 'react-redux';

import {
  useFonts, 
  Poppins_700Bold, 
  Poppins_600SemiBold, 
  Poppins_400Regular, 
  Poppins_400Regular_Italic, 
  Poppins_500Medium, 
  Poppins_300Light
  } 
  from '@expo-google-fonts/poppins'

import Foot from '../assets/foot.js'
import Basket from '../assets/basket.js'
import Running from '../assets/running.js'
import Tennis from '../assets/tennis.js'
import Message from '../assets/message.js'
import Position from '../assets/position.js'
import Close from '../assets/close.js'


const BACKEND_ADRESS='http://192.168.10.124:3000'

export default function MapScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);



  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', description: '', ambition: '', profilePicture:'', coverPicture:''});
  const [userNickname, setUserNickname] = useState('');

  // État pour la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  // État pour le bouton actif
  const [activeButton, setActiveButton] = useState(null);

//  Redirect to /login if not logged in
  useEffect(() => {
    if (!user.token) {
      navigation.navigate('Home');
    }
    }, [])

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

  // Fonction pour gérer les cliques sur les boutons
  const handlePress = (buttonName) => {
    // Si le bouton est actif, le désactiver
    if (activeButton === buttonName) {
      setActiveButton(null);
    } else {
      // Sinon, activer le bouton cliqué
      setActiveButton(buttonName);
    }
  };

  // Fonction qui modifie la couleur du bouton au click
  const getButtonStyle = (buttonName) => {
    return activeButton === buttonName ? styles.activeIcon : styles.icon;
  };

  const handleClose = () => {
    setModalVisible(false);
    setModal2Visible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
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
  };

  useEffect(() => {
    console.log('hello');
    fetch(`${BACKEND_ADRESS}/user/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data);
          
          setUserInfo(prevState => ({
            ...prevState, 
            profilePicture: data.user.profilePicture, 
          }));
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données', error));
  }, []);

  // image par défaut au cas ou il n'y pas d'image trouvée
const defaultImage = '../assets/imagePerso.png';

  
  const handleModal = () => {
    fetch(`${BACKEND_ADRESS}/user/${user.token}`)
      .then(response => response.json())
      .then(data => {
       
        if (data.result) {
          //console.log(data);
          const user = data.user;
          setUserInfo({
            nickname: user.nickname,
            description: user.description,
            ambition: user.ambition,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture
          });
          setModalVisible(true);
          setModal2Visible(false);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      });
  };

  const handleModal2 = () => {
    fetch(`${BACKEND_ADRESS}/user/${user.token}`)
      .then(response => response.json())
      .then(data => {
       
        if (data.result) {
          //console.log(data);
          const user = data.user;
          setUserInfo({
            nickname: user.nickname,
            description: user.description,
            ambition: user.ambition,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture
          });
          setModal2Visible(true);
          setModalVisible(false);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      });
  };
  
  const handleModif = () => {
    navigation.navigate('EditProfile');
    setModalVisible(false);
  };

  const handle2Modif = () => {
    navigation.navigate('Chat');
    setModal2Visible(false);
  };

  const handleReviews = () => {
    //navigation.navigate('Review');
    setModalVisible(false);
  };

  const handle2Reviews = () => {
    //navigation.navigate('Review');
    setModal2Visible(false);
  };

  const handleChat = () => {
    navigation.navigate('Chat');
  };

  const handleReturnToLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  //Fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold, 
    Poppins_400Regular, 
    Poppins_400Regular_Italic, 
    Poppins_500Medium, 
    Poppins_300Light
})

if(!fontsLoaded){
    return null
}

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} 
      >

        {region && (

          <MapView
            style={styles.map}
            region={region}
          >
            {location && (
              <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
                <View style={styles.blueDot} />
              </Marker>
            )}

          </MapView>
        )}
        
        <View style={styles.searchContainer}>

        <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Image style={styles.photoCoverModal} source={{ uri: userInfo.coverPicture}}/>
              <Image style={styles.photoProfilModal} source={{ uri: userInfo.profilePicture}}/>
              <Text style={styles.textModal1}>{userInfo.nickname}</Text>
              <Text style={styles.textModal2}>{userInfo.description}</Text>
              <Text style={styles.textSports}>MES SPORTS </Text>
              <Text style={styles.textambition}>MON AMBITION </Text>
              <Text style={styles.textModal3}>{userInfo.ambition}</Text>
          </View>

          <View style={styles.modalClose}>

            <TouchableOpacity onPress={() => handleClose()}>
            <Image source={require('../assets/close.jpg')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleReviews()} style={styles.boutonAvis} >
            <Image source={require('../assets/boutonAvis.jpg')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleModif()} style={styles.frameChat} activeOpacity={0.8} >
            <Image source={require('../assets/boutonModifier.jpg')}/>
            </TouchableOpacity>
          </View>
         
        </View>
        </Modal>

        <Modal visible={modal2Visible} animationType="fade" transparent>

        <View style={styles.centeredView}>

          <View style={styles.modalView}>
          <Image style={styles.photoCoverModal} source={{ uri: userInfo.coverPicture}}/>
              <Image style={styles.photoProfilModal} source={{ uri: userInfo.profilePicture}}/>
              <Text style={styles.textModal1}>{userInfo.nickname}</Text>
              <Text style={styles.textModal2}>{userInfo.description}</Text>
              <Text style={styles.textSports}>SES SPORTS </Text>
              <Text style={styles.textambition}>SON AMBITION </Text>
              <Text style={styles.textModal3}>{userInfo.ambition}</Text>
          </View>

            <View style={styles.modalClose}>
            <TouchableOpacity style={getButtonStyle('close')} onPress={() => handleClose('close')}>
              <Close/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleReviews()} style={styles.boutonAvis} >
            <Image source={require('../assets/boutonAvis.jpg')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handle2Modif()} style={styles.frameChat} activeOpacity={0.8} >
            <Image source={require('../assets/frameChat.jpg')}/>
            </TouchableOpacity>
          </View>
         
        </View>
        </Modal>

          <TextInput
            style={styles.input}
            placeholder="votre recherche"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity onPress={() => handleModal2()} style={styles.modaluser} activeOpacity={0.8}>
            <Image source={require('../assets/imagePerso.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleModal()} style={styles.modalProfil} activeOpacity={0.8}>
          <Image source={{ uri: userInfo.profilePicture || defaultImage }} style={{width: 48, height: 48, borderRadius:57,}}/>
          </TouchableOpacity>

              <View style={styles.buttonLocation}>
              <TouchableOpacity style={getButtonStyle('position')} onPress={() => handleReturnToLocation('position')}>
              <Position/>
              </TouchableOpacity>
              </View>
         
          </View>

        <TouchableOpacity style={styles.message} onPress={() => handleChat()}>
          <Message/>
        </TouchableOpacity>

      
        <View style={styles.containerIcons}>
          <TouchableOpacity style={getButtonStyle('foot')} onPress={() => handlePress('foot')}>
            <Foot/>
          </TouchableOpacity>

          <TouchableOpacity style={getButtonStyle('running')} onPress={() => handlePress('running')}>
            <Running/>
          </TouchableOpacity>

          <TouchableOpacity style={getButtonStyle('basket')} onPress={() => handlePress('basket')}>
            <Basket/>
          </TouchableOpacity>
          
          <TouchableOpacity style={getButtonStyle('tennis')} onPress={() => handlePress('tennis')}>
            <Tennis/>
          </TouchableOpacity>
         </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },

// Map
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

// Input recherche
  searchContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    textAlign: 'center',
  },

// icon position
  blueDot: {
    width: 20,
    height: 20,
    backgroundColor: '#4A46FF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView:{
    position: "absolute",
    backgroundColor: 'white',
    height: 667,
    width:352,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 20,
    padding: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  photoCoverModal:{
    position: "absolute",
    width: 323,
    height: 183,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 15,
    alignItems:'center',
    top: '5%',
},

photoProfilModal: {
    position: 'absolute',
    top: '40%',
    width: 134,
    height: 134,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#F4F4F4',
    backgroundColor: 'white',
},

  textModal1:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:'82%',
    width: 299,
    fontSize: 28,
    left: 130,
    fontFamily: 'Poppins_700Bold'
  },

  textModal2:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:'94%',
    fontSize: 14,
    width: 299,
    fontFamily: 'Poppins_400Regular_Italic',
  },

  textSports:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:'115%',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold'
  },

  textambition:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:'150%',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold'
  },

  textModal3:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:'160%',
    fontSize: 14,
    width: 299,
    fontFamily: 'Poppins_400Regular_Italic'
  },

  modalClose:{
    position: "absolute",
    top:110,
    right:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#4A46FF',
    width:44,
    height:44,
    borderRadius:50,
  },

  boutonAvis:{
    position: "absolute",
    top:'620%',
    right:100,
    justifyContent:'center',
    alignItems:'center',
    width:44,
    height:44,
    borderRadius:50,
  },

  frameChat:{
    position: "absolute",
    top:650,
    right:110,
  },

  // icon image perso
  modaluser:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:150,
    right:150,
    width:78,
    height:77,
    borderRadius:57,
  },

  modalProfil:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:'20%',
    right:'5%',
    width:48,
    height:48,
    borderRadius:57,
  },

  buttonLocation:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:'20%',
    right:'82%',
    width:48,
    height:48,
    borderRadius:57,
  },


// icon message
  message:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:180,
    right:40,
    backgroundColor:"#FFFFFF",
    width:78,
    height:77,
    borderRadius:57,
  },

// icon sports container
  containerIcons:{
    position: "absolute",
    backgroundColor:'white',
    borderRadius:20,
    bottom:'2%',
    height:'12%',
    width:'85%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    alignSelf:'center',
    marginTop: 'auto',
    marginBottom:20,
  },

  //Icon sports non actives
  icon:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#FFFFFF",
    width:'24%',
    height:'24%',
    borderRadius:12,
  },

//Icon sports actives bleue Move
  activeIcon: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#4A46FF',
    width:'24%',
    height:'90%',
    borderRadius:12,
  },

});
