import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKEND_ADDRESS = "http://192.168.100.196:3000";

export default function ChatScreen({ newToken, navigation, route }) {
  //  Redirect to /login if not logged

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  const user = useSelector((state) => {
    return state?.user.value;
  });

  const [dipslayMessage, setDisplayMessage] = [
    {
      newToken: null,
      token: null,
      message: null,
    },
  ];
  const [message, setMessage] = useState("");
  const [chatter, setChatter] = useState({
    nickname: null,
    profilePicture: null,
  });

  const handleReviews = (newToken) => {
    navigation.navigate("Review", { newToken });
  };


  const [messageData, setMessageData] = useState(null);
  //Affiche la photo et le nom de l'utilisateur
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/user/${route.params.newToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const user = data.user;
          setChatter({
            nickname: user.nickname,
            profilePicture: user.profilePicture,
          });
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      });
  }, []);

  //Envoie un message
  const handleMessage = () => {
    fetch(`${BACKEND_ADDRESS}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        newToken: route.params.newToken,
        newMessageContent: message,
      }),
    })
      .then((data) => {
        console.log("token : ", user.token);
        console.log("newToken : ", route.params.newToken);
        if (data.ok) {
          setMessage("");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête fetch :", error);
      });
  };

  //Afficher tous les messages

  useEffect(() => {
    const fetchMessages = () => {
      fetch(`${BACKEND_ADDRESS}/chat/${route.params.newToken}/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          const messages = data.message.map((messageItem, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: 10,
                  marginBottom: 7,
                  borderRadius: 8,
                  backgroundColor:
                    messageItem.sender.token === user.token
                      ? "#4A46FF"
                      : "#F4F4F4",
                  minHeight: 30,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent:
                    messageItem.sender.token === user.token
                      ? "flex-end"
                      : "flex-start",
                  alignSelf:
                    messageItem.sender.token === user.token
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 14,
                    fontFamily: "Poppins_400Regular",
                    color:
                      messageItem.sender.token === user.token
                        ? "white"
                        : "#black",
                  }}
                >
                  {messageItem.message}
                </Text>
              </View>
            );
          });
          console.log("data message=>", messages);
          setMessageData(messages);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur:",
            error
          );
        });
    };

    // Effectuer une première requête au chargement de l'écran
    fetchMessages();

    // Définir une intervalle pour effectuer des requêtes périodiques toutes les 2 secondes
    const intervalId = setInterval(fetchMessages, 2000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [route.params.newToken, user.token]);

  //Fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null; // Attendre le chargement des polices
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // Ajustez cette valeur selon votre disposition
      >
        <View
          style={{
            backgroundColor: "#E2E2E2",
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 140,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 40,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,

                paddingLeft: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={24} color="#black" />
            </TouchableOpacity>

            <View
              style={{
                width: "70%",
                height: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={()=> handleReviews(route.params.newToken)}>
              <Image
                style={{
                  height: 85,
                  width: 85,
                  marginBottom: 4,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: "white",
                }}
                source={
                  chatter.profilePicture
                    ? { uri: chatter.profilePicture }
                    : require("../assets/imagePerso.png")
                }
              />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {chatter.nickname}
              </Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
              }}
            ></View>
          </View>

          <ScrollView
            style={{
              height: "60%",
              width: "100%",
              padding: 20,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {messageData}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 120,
              backgroundColor: "#E2E2E2",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: "85%",
                borderRadius: 15,
                backgroundColor: "white",
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="Entrez votre message ici"
                placeholderTextColor="#747474"
                value={message}
                onChangeText={(text) => setMessage(text)}
                onSubmitEditing={handleMessage}
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  textAlign: "left",
                  paddingLeft: 20,
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
