import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Modal,
    TextInput,
    Image,
    ScrollView,
    } from 'react-native';
    
import React, { useRef, useCallback, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
import Create from '../assets/create.js'

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] =useState(false);
    const snapPoints = ["40%"]

    const handleSnapPress = useCallback((index)=>{
        sheetRef.current?.snapToIndex(index)
        setIsOpen(true)
    },[])

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [description, setDescription] = useState('');
    const [ambition, setAmbition] = useState('');

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
    <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Text style={styles.logo}>MOVE</Text>
            </View>

            <View style={styles.buttons}>

                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.buttonSignUp} activeOpacity={0.8}>
                    <Text style={styles.textSignUp}>Inscription</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>handleSnapPress(0)} style={styles.buttonSignIn} activeOpacity={0.8}>
                    <Text style={styles.textSignIn}>Connexion</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                visible={isModalVisible} 
                onRequestClose={()=>{setIsModalVisible(false)}} 
                animationType="slide"
                presentationStyle="pageSheet"
                >
                <ScrollView>
                    <View style={styles.modalSignIn}>
                        <Text style={styles.title}>INSCRIPTION</Text>
                        <View style={styles.pseudo}>
                            <TextInput
                                type="text"  
                                style={styles.textPseudo}
                                placeholder='Pseudo*'      
                                onChangeText={(value) => setNickname(value)}
                                value={nickname}
                            />
                        </View>
                        <View style={styles.email}>
                            <TextInput
                                style={styles.textEmail}
                                type="email"  
                                placeholder='Email*'   
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                            />
                        </View>
                        <View style={styles.password}>
                            <TextInput
                                style={styles.textPassword}
                                type="password*"  
                                placeholder='Password'     
                                onChangeText={(value) => setPassword(value)}
                                value={password}
                            />
                        </View>
                        <View styles={styles.contenairExplicationAdress}>
                            <Text style={styles.textExplicationAdress}>
                                Ta position en temps réel ne sera pas partagée. Seule l'adresse de ton lieu d’entraînement sera visible.
                            </Text>
                        </View>
                        <View style={styles.adress}>
                            <TextInput
                                style={styles.textAdress}
                                type="text"  
                                placeholder='Adresse*'  
                                onChangeText={(value) => setAdress(value)}
                                value={adress}
                            />
                        </View>
                        <View style={styles.description}>
                            <TextInput
                                style={styles.textDescription}
                                type="text"  
                                placeholder='Description'  
                                onChangeText={(value) => setDescription(value)}
                                value={description}
                            />
                        </View>
                        <Text style={styles.textSports}>MES SPORTS*</Text>
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
                        <View style={styles.ambition}>
                            <TextInput  
                                style={styles.textAmbition}  
                                type="text"  
                                placeholder='Ambition'
                                onChangeText={(value) => setAmbition(value)}
                                value={ambition}
                            />
                        </View>
                            <TouchableOpacity style={styles.buttonOk} onPress={() => setIsModalVisible(false)}>
                               <View style={styles.contenairButtonOk}>
                                    <Create style={styles.iconCreate}/>
                                    <Text style={styles.textButtonOk}>Créer ton profil</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonBack} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.textButtonBack}>Retour</Text>
                            </TouchableOpacity>
                            <View style={styles.containairLegend}>
                            <Text style={styles.legend}>*Champ  obligatoire</Text>
                            </View>
                    </View>
                    </ScrollView>
            </Modal>

            
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={()=>setIsOpen(false)}
                >
                <View style={styles.bottomSheetContent}>
                    <Text>Connexion</Text>
                </View>
            </BottomSheet>


        </View>
    </GestureHandlerRootView>
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

    modalizeContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },

      modalContent:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'black',
        textAlign: 'center',
      },

    //MODAL SIGN IN

    title:{
        fontFamily: 'Poppins_700Bold',
        fontSize:28,
        color:'black',
        textAlign: 'center',
        marginTop:60,
        marginBottom:55,
    },

    modalSignIn:{
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
        alignSelf: 'center',
        marginBottom:15,
    },

    contenairButtonOk:{
        justifyContent:'center',
        flexDirection:'row',

    },

    buttonOk:{
        width : '85%',
        height: 53,
        backgroundColor:'#4A46FF',
        borderRadius:100,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf: 'center',
        marginBottom:13,
    },

    iconCreate:{
        height:22,
    },

    textButtonOk:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'white',
        width:'44%',
        textAlign: 'center',
    },

    textButtonBack:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'black',
        textAlign: 'center',
    },


    //ICONS

    textSports:{
        fontFamily: 'Poppins_700Bold',
        fontSize:16,
        color:'black',
        textAlign: 'center',
        marginBottom:13,
    },

    containerIcons:{
        flexDirection:'row',
        marginBottom:13,
        alignSelf: 'center',
    },

    iconFoot:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
        marginHorizontal: 6,
    },

    iconTennis:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
        marginHorizontal: 6,
    },

    iconRunning:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
        marginHorizontal: 6,
    },

    iconBasket:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        width:71,
        height:69,
        borderRadius:12,
        marginHorizontal: 6,
    },

    // INPUT
    
    pseudo:{
        backgroundColor:'white',
        width:'85%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        paddingLeft:15,
        marginBottom:13,
        alignSelf: 'center',

    },

    textPseudo:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },

    email:{
        backgroundColor:'white',
        width:'85%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        paddingLeft:15,
        marginBottom:13,
        alignSelf: 'center', 

    },

    textEmail:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },

    password:{
        backgroundColor:'white',
        width:'85%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        paddingLeft:15,
        marginBottom:13,
        alignSelf: 'center',

    },


    textExplicationAdress: {
        fontFamily: 'Poppins_700Bold',
        fontSize:14,
        width:'85%',
        height:80,
        textAlign: 'left',
        color:'black',
        alignSelf: 'center',
        alignItems:'center',
        lineHeight: 25,
        marginTop:10,
        marginLeft:28,
        marginBottom:10,
    },

    textPassword:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },

    adress:{
        backgroundColor:'white',
        width:'85%',
        height:90,
        borderRadius:10,
        paddingLeft:15,
        marginBottom:13,
        alignSelf: 'center',

    },

    textAdress:{
        marginTop:13,
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },

    description:{
        backgroundColor:'white',
        width:'85%',
        height:90,
        borderRadius:10,
        paddingLeft:15,
        marginBottom:28,
        alignSelf: 'center',
    },

    textDescription:{
        marginTop:13,
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },
   
    ambition:{
        backgroundColor:'white',
        width:'85%',
        height:90,
        borderRadius:10,
        paddingLeft:15,
        marginBottom:13,
        alignSelf: 'center',

    },

    textAmbition:{
        marginTop:13,
        fontFamily: 'Poppins_600SemiBold',
        fontSize:14,
        color:'#9B9B9B',
    },

    containairLegend:{
        width:'85%',
        justifyContent: 'center',
        alignContent:'center',
        height:20,
        alignSelf:'center',
        marginBottom:15,
    },

    legend:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:13,
        color: '#9F9F9F',
    },

})