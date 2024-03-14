import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AntDesign } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const BACKEND_ADDRESS = "http://192.168.10.122:3000";

export default function displayReviewsScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nickname: "",
    profilePicture: "",
  });

  const token = useSelector((state) => state.user.value.token);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reviewText, setReviewText] = useState("");
  const [averageStar, setAverageStar] = useState(0);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleButtonClick = () => {
    const navigation = useNavigation();
    navigation.navigate("NomDeLaPage");
  };

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/NlQWH0dlyhQZ7WaZSGzth9129mtttLGj`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.result) {
          setUserData(data.user);
          setAverageStar(data.user.averageStar);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
    // }
  }, [token]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/review`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des avis:", error);
      });
  }, [token]);
}

return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    keyboardVerticalOffset={
      Platform.OS === "ios" ? 64 : -StatusBar.currentHeight
    }
    style={{ flex: 1 }}
  >
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <AntDesign name="left" size={24} color="#4A46FF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "blue",
    alignItems: "center",
  },

  backButton: {
    marginTop: 1,
    top: 100,
    top: 80,
    right: 170,
  },

})
