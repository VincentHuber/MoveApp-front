import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const BACKEND_ADDRESS = "http://192.168.100.36:3000"; 

export default function ReviewScreen({navigation}) {
  const [addReviews, setAddReviews] = useState([]);
  const token = useSelector((state) => state.user.value.token);

  const [userData, setUserData] = useState({
    nickname: "",
    profilePicture: "",
    averageStar: 0,
  });

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.result) {
          setUserData(data.user);
        }
      })  
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
  }, [token]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <AntDesign name="left" size={24} color="#4A46FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: userData.profilePicture || "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
          }}
          style={styles.profileImageTop}
        />
        <View style={styles.textNickname}>
          <Text style={styles.pseudoText}>{userData.nickname}</Text>
          <View style={styles.starContainer}>
            <FontAwesomeIcon icon={faStar} style={styles.starIcon} />
            <Text style={styles.averageStarText}>{userData.averageStar}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        {addReviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <View style={styles.starItem}>
              {[...Array(review.stars)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  style={[
                    styles.star,
                    { color: i < review.stars ? "#4A46FF" : "grey" },
                  ]}
                />
              ))}
            </View>
            <Text>{review.date.toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

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
    right: 110,
  },

  profileImageContainer: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "center",
  },

  profileImageTop: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "white",
  },

  pseudoText: {
    color: "black",
    paddingVertical: 30,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 60,
  },

  textNickname: {
    marginLeft: 20,
  },

  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  starIcon: {
    color: "#4A46FF",
    marginRight: 5,
  },

  averageStarText: {
    color: "#4A46FF",
    fontSize: 16,
  },

  reviewItem: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  starItem: {
    flexDirection: "row",
  },

  star: {
    marginRight: 5,
    alignItems: "center",
    color: "gray",
    width: 10,
  },
});