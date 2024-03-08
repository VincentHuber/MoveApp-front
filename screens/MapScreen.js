import React, { useState, useEffect } from 'react';
import { View, Image, Modal, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useDispatch, useSelector } from 'react-redux';

import Foot from '../assets/foot.js'
import Basket from '../assets/basket.js'
import Running from '../assets/running.js'
import Tennis from '../assets/tennis.js'
import Message from '../assets/message.js'

const BACKEND_ADRESS='http://172.20.10.11:3000'

export default function MapScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user)


  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', description: '', ambition: ''});
  const [userNickname, setUserNickname] = useState('');

  // État pour la modal
  const [modalVisible, setModalVisible] = useState(false);

  // État pour le bouton actif
  const [activeButton, setActiveButton] = useState(null);

//  Redirect to /login if not logged in
  useEffect(() => {
    if (!user.token) {
      navigation.navigate('Home');
    }
    }, [])

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

  
  const handleModal = () => {
    console.log(user);
    console.log("coucoyu");
    fetch(`${BACKEND_ADRESS}/user/${user.token}`)
      .then(response => response.json())
      .then(data => {
       
        if (data.result) {
          console.log(data);
          const user = data.user;
          setUserInfo({
            nickname: user.nickname,
            description: user.description,
            ambition: user.ambition
          });
          setModalVisible(true);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      });
  };

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
              <Text style={styles.textModal1}>{userInfo.nickname}</Text>
              <Text style={styles.textModal2}>{userInfo.description}</Text>
              <Text style={styles.textambition}>son ambition</Text>
              <Text style={styles.textModal3}>{userInfo.ambition}</Text>
          </View>
          <View style={styles.modalClose}>
          <TouchableOpacity onPress={() => handleClose()}>
          <Image source={require('../assets/close.jpg')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress()} style={styles.frameChat} activeOpacity={0.8}>
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

          <TouchableOpacity onPress={() => handleModal()} style={styles.modaluser} activeOpacity={0.8}>
            <Image source={require('../assets/imagePerso.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleModal()} style={styles.modalProfil} activeOpacity={0.8}>
            <Image source={require('../assets/photoProfil.jpg')}/>
          </TouchableOpacity>
          
          </View>

        <TouchableOpacity style={styles.message}>
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

  textModal1:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:110,
    right:180,
    fontSize: 30,
  },

  textModal2:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    top:200,
    left: 45,
    fontSize: 20,
    width: 299,
  },

  textModal3:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:100,
    left: 45,
    fontSize: 20,
    width: 299,
  },

  textambition:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:200,
    left: 120,
    fontSize: 20,
    width: 299,
    fontWeight: 'bold'
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
