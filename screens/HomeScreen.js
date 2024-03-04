import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Modal,
    Image,
    } from 'react-native';
    
import React, { useState } from 'react'

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

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false)

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

    const handleSubmit = () => {
    };

  return (
    <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Text style={styles.logo}>MOVE</Text>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.buttonSignUp} activeOpacity={0.8}>
                    <Text style={styles.textSignUp}>Inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonSignIn} activeOpacity={0.8}>
                    <Text style={styles.textSignIn}>Connexion</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                visible={isModalVisible} 
                onRequestClose={()=>{setIsModalVisible(false)}} 
                animationType="slide"
                presentationStyle="pageSheet"
                >
                    <View style={styles.modalSignIn}>
                        <Text style={styles.title}>Inscription</Text>

                        <View style={styles.containerIcons}>
                            <TouchableOpacity style={styles.iconFoot}>
                                <Foot/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconRunning}>
                                <Running/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBasket}>
                                <Basket/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconTennis}>
                                <Tennis/>
                            </TouchableOpacity>
                        </View>
                            <TouchableOpacity style={styles.buttonBack} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.textButtonBack}>Retour</Text>
                            </TouchableOpacity>
                        
                    </View>
            </Modal>

        </View>
  )
}

const styles = StyleSheet.create({

    container : {
        flex: 1,
        backgroundColor: '#4A46FF',
        justifyContent:'space-between',
        width:'100%',
        height: '100%',
    },

    //LOGO

    logoContainer: {
        height: '52%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    logo:{
        fontFamily: 'Poppins_700Bold',
        fontSize:41,
        letterSpacing: 5,
        color: 'white',
    },

    //BUTTONS

    buttons: {
        height: '48%',
        justifyContent:'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
    },

    buttonSignUp:{
        width : '85%',
        height: 53,
        backgroundColor:'white',
        borderRadius:100,
        justifyContent: 'center',
        alignContent:'center',
        marginBottom:11,
    },

    textSignUp:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        textAlign: 'center',
    },

    buttonSignIn:{
        width : '85%',
        height: 53,
        borderWidth:1.6,
        borderColor:'white',
        borderRadius:100,
        justifyContent: 'center',
        alignContent:'center',
    },

    textSignIn:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'white',
        textAlign: 'center',
    },

    //MODAL SIGN IN

    title:{
        fontFamily: 'Poppins_700Bold',
        fontSize:28,
        color:'black',
        textAlign: 'center',
        marginTop:60,
        marginBottom:50,
    },

    modalSignIn:{
        flex:1,
        height:'100%',
        width:'100%',
        backgroundColor:'#F4F4F4',
        alignContent:'center',
        borderRadius:2,
        borderColor:'red',
    },

    buttonBack:{
        width : '85%',
        height: 53,
        backgroundColor:'white',
        borderRadius:100,
        justifyContent: 'center',
        alignContent:'center',
    },

    textButtonBack:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'black',
        textAlign: 'center',

    },


    //ICONS

    containerIcons:{
        flexDirection:'row',
    },

    iconFoot:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
    },

    iconTennis:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
    },

    iconRunning:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
    },

    iconBasket:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
    },

   

})