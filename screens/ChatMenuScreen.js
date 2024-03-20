import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import Add from "../assets/add.js";

import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import { useDispatch, useSelector } from "react-redux";


const BACKEND_ADDRESS = 'http://192.168.1.132:3000'

const ChatMenuScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const[menu, setMenu]=useState({})

    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/user/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              setMenu(data.user.match);
              console.log ("RESULT => ",data.user.match)
            }
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des informations de l'utilisateur:",
              error
            );
            setUsers(data);
        });
    }, []);
   
    

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
    return null;
  }


  return (

    // 1e layer
    <View
      style={{
        flex: 1,
        backgroundColor: "#E2E2E2",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >

      {/* 2e layer */}
      <View
        style={{
          backgroundColor: "#F4F4F4",
          height: "80%",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          width: "95%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Chat + */}
        <View
          style={{
            margin: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            // borderWidth:1,
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontFamily: "Poppins_700Bold",
              fontSize: 30,
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            CHAT
          </Text>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Add style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        </View>

        {/* 3e layer */}
        <View
          style={{
            width: "93%",
            height: "90%",
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            backgroundColor: "white",
          }}
        >



        </View>
      </View>
    </View>
  );
};

export default ChatMenuScreen;

const styles = StyleSheet.create({});
