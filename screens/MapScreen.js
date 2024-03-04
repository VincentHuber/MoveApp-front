import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [searchText, setSearchText] = useState('');

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
    // Utilisez KeyboardAvoidingView au lieu de View comme conteneur principal
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajustez le comportement pour iOS et Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Décalage vertical pour iOS
    >
      <TextInput
        style={styles.input}
        placeholder="Search for an address"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Assurez-vous que le contenu est aligné au début
    height: '100%',
    width: '100%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50, // Ajustez en fonction de la hauteur du TextInput et du Button
  },
  input: {
    width: '90%',
    height: 50, // Ajusté pour une meilleure visibilité
    borderWidth: 1,
    borderColor: 'black',
    padding: 10, // Ajustement pour le padding interne
    marginTop: 20, // Espacement en haut
    borderRadius: 5, // Bordures arrondies
    fontSize: 18, // Taille de la police ajustée
  },
  blueDot: {
    // Styles pour le point bleu inchangés
    width: 20,
    height: 20,
    backgroundColor: '#4A46FF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
