import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Foot from '../assets/foot.js'
import Basket from '../assets/basket.js'
import Running from '../assets/running.js'
import Tennis from '../assets/tennis.js'
import Message from '../assets/message.js'

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState('');

  // État pour le bouton actif
  const [activeButton, setActiveButton] = useState(null);

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
          <TextInput
            style={styles.input}
            placeholder="votre recherche"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <Button title="Search" onPress={handleSearch} />
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

// icon message
  message:{
    position: "absolute",
    justifyContent:'center',
    alignItems:'center',
    bottom:120,
    right:40,
    backgroundColor:"#FFFFFF",
    width:78,
    height:77,
    borderRadius:57,
  },

// icon sports container
  containerIcons:{
    backgroundColor:'white',
    borderRadius:20,
    height: '15%',
    width:'85%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    alignSelf:'center',
    marginTop: 'auto',
    marginBottom:'-17%',
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
