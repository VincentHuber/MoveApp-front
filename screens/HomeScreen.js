import React, { useRef, useCallback, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Modal,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    } from 'react-native';
    
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {user, login, addProfilePicture, addCoverPicture } from '../reducers/users';

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
import Upload from '../assets/upload.js'

const BACKEND_ADRESS = 'http://192.168.10.153:3000'


export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();
    const userProfilePicture = useSelector(state => state.user.value.profilePicture);
    const userCoverPicture = useSelector(state => state.user.value.coverPicture);
    

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [nickname, setNickname] = useState('');
    const [adress, setAdress] = useState('');
    const [description, setDescription] = useState('');
    const [ambition, setAmbition] = useState('');
    const [signInUsermail, setSignInUsermail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    const [selectedSports, setSelectedSports] = useState({
        Football: false,
        Basketball: false,
        Running: false,
        Tennis: false,
      });

      const handleAddSport = (sport) => {
        setSelectedSports(prevState => ({
          ...prevState,
          [sport]: !prevState[sport],
        }));
      };

    // pour comprendre la modal BottomSheet : https://www.youtube.com/watch?v=SgeAfiz_j_w&t=184s
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(-1);
    const snapPoints = ["45%"]

    const handleSnapPress = useCallback((index)=>{
        sheetRef.current?.snapToIndex(index)
        setIsOpen(0)
    },[])

    
    //Pictures upload
    const [cover, setCover] = useState(null);

    const uploadCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 2],
        quality: 0.5,
        });
        console.log(result);

        if (!result.canceled) {
        setCover(result.assets[0].uri);
        }
    };
        
    const [profile, setProfile] = useState(null);

    const uploadProfile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        });
        console.log(result);

        if (!result.canceled) {
        setProfile(result.assets[0].uri);
        }
    };
        
    //Profile creation
    const createProfile = async (userData, profile, cover) => {
        try {
            const resCreation = await fetch(`${BACKEND_ADRESS}/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
    
            const dataCreation = await resCreation.json();
            if (!dataCreation.result) throw new Error("Error signing up")
    
            const { token, adress, email, nickname, ambition, description, sports } = dataCreation.user;
            dispatch(login({ token, adress, email, nickname, ambition, description, sports }))
    
            if (profile && cover) {
                console.log("token", token);
                // Upload cover picture
                const formDataCover = new FormData();
                formDataCover.append('coverPicture', {
                    uri: cover,
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                });
    
                const resCover = await fetch(`${BACKEND_ADRESS}/user/uploadPictureCover/${token}`, {
                    method: 'POST',
                    body: formDataCover,
                })
    
                const dataCover = await resCover.json()
                if (!dataCover.result) throw new Error('Error uploading cover picture');
                dispatch(addCoverPicture(dataCover.url));
    
                // Upload profile picture
                const formDataProfile = new FormData();
                formDataProfile.append('profilePicture', {
                    uri: profile,
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                });
    
                const resProfile = await fetch(`${BACKEND_ADRESS}/user/uploadProfileCover/${token}`, {
                    method: 'POST',
                    body: formDataProfile,
                })
    
                const dataProfile = await resProfile.json()
                if (!dataProfile.result) throw new Error('Error uploading profile picture');
                dispatch(addProfilePicture(dataProfile.url));
            }

            setIsModalVisible(false);
            navigation.navigate('Map');

        } catch (e) {
            alert(e.message)
        }

    };


    const handleConnection = () => {
        console.log({ email: signInUsermail, password: signInPassword })
		fetch(`${BACKEND_ADRESS}/user/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signInUsermail, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
                console.log(data)
				if (data.result) {
					dispatch(login({ email: signInUsermail, token: data.token }));
					setSignInUsermail('');
					setSignInPassword('');
					setIsOpen(-1);
                    navigation.navigate('Map')
				}else {
                    Alert.alert('Email et/ou mot de passe incorrect(s).')}
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
                                style={styles.textPseudo}
                                placeholder='Pseudo*'      
                                onChangeText={(value) => setNickname(value)}
                                value={nickname}
                            />
                        </View>
                        <View style={styles.email}>
                            <TextInput
                                style={styles.textEmail}
                                
                                placeholder='Email*'   
                                onChangeText={(value) => setSignInUsermail(value)}
                                value={signInUsermail}
                            />
                        </View>
                        <View style={styles.password}>
                            <TextInput
                                style={styles.textPassword}
                                secureTextEntry={true}
                                placeholder='Password*'     
                                onChangeText={(value) => setSignInPassword(value)}
                                value={signInPassword}
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
                               
                                placeholder='Adresse*'  
                                onChangeText={(value) => setAdress(value)}
                                value={adress}
                            />
                        </View>
                        <View style={styles.description}>
                            <TextInput
                                style={styles.textDescription}
                                 
                                placeholder='Description'  
                                onChangeText={(value) => setDescription(value)}
                                value={description}
                            />
                        </View>
                        <Text style={styles.textSports}>MES SPORTS*</Text>
                        <View style={styles.containerIcons}>
                            <TouchableOpacity style={styles.iconFoot} 
                                onPress={()=>handleAddSport('Football')}>
                                    <Foot/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconRunning} 
                                    onPress={()=>handleAddSport('Running')}>
                                <Running/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBasket}
                                    onPress={()=>handleAddSport('Basketball')}>
                                <Basket/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconTennis}
                                    onPress={()=>handleAddSport('Tennis')}>
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

                        <View style={styles.uploadContainer}>
                
                        
                        {cover ? (
                            <Image source={{ uri: cover }} style={styles.uploadCover} />
                                        ) : (
                                        <View style={styles.uploadCover}>
                                            <Text style={styles.textUploadProfile}>
                                            Photo de couverture
                                            </Text>
                                        </View>
                                        )}
                            <TouchableOpacity onPress={()=>uploadCover()}>
                                <Upload style={styles.buttonUploadProfile}/>
                            </TouchableOpacity>
                           

                        {profile ? (
                            <Image source={{ uri: profile }} style={styles.uploadProfile} />
                                        ) : (
                                        <View style={styles.uploadProfile}>
                                            <Text style={styles.textUploadProfile}>
                                            Photo de profile
                                            </Text>
                                        </View>
                                        )}
                            <TouchableOpacity onPress={()=>uploadProfile()}>
                                <Upload style={styles.buttonUploadProfile}/>
                            </TouchableOpacity>

                        </View>
                            <TouchableOpacity style={styles.buttonOk} onPress={() => createProfile({
                                    nickname,
                                    email: signInUsermail,
                                    password : signInPassword,
                                    ambition,
                                    adress,
                                    sports :selectedSports,
                                    description,
                                }, profile, cover)}>
                               <View style={styles.contenairButtonOk}>
                                    <Create style={styles.iconCreate}/>
                                    <Text style={styles.textButtonOk}>Créer ton profil</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonBack} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.textButtonBack}>Retour</Text>
                            </TouchableOpacity>
                            <View style={styles.containairLegend}>
                            <Text style={styles.legend}>*Champ obligatoire</Text>
                            </View>
                    </View>
                    </ScrollView>
            </Modal>

            
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={()=>setIsOpen(0)}
                index={isOpen}
                style={styles.bottomSheet}
                >
                    <View style={styles.bottomSheetContent}>

                        <Text style={styles.titleSignIn}>CONNEXION</Text>
                        <View style={styles.email}>
                                <TextInput
                                    style={styles.textEmail}
                                    type="email"  
                                    placeholder='Email*'   
                                    onChangeText={(value) => setSignInUsermail(value)}
                                    value={signInUsermail}
                                />
                            </View>
                            <View style={styles.password}>
                                <TextInput
                                    style={styles.textPassword}
                                    type="password*"  
                                    placeholder='Password'     
                                    onChangeText={(value) => setSignInPassword(value)}
                                    value={signInPassword}
                                />
                            </View>
                        <TouchableOpacity style={styles.buttonSignInOk}  onPress={() => handleConnection()}>
                            <Text style={styles.textButtonSignInOk}>Ok</Text>
                        </TouchableOpacity>
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

    //MODAL SIGN UP

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


    //MODAL SIGN IN
    bottomSheet:{
    },

    bottomSheetContent:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F4F4F4',
    },

    buttonSignInOk:{
        width : '85%',
        height: 53,
        backgroundColor:'#4A46FF',
        borderRadius:100,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf:'center',
    },

    textButtonSignInOk:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize:16,
        color:'white',
        width:'44%',
        textAlign: 'center',
    },

    titleSignIn:{
        fontFamily: 'Poppins_700Bold',
        fontSize:28,
        color:'black',
        textAlign: 'center',
        marginTop: 5,
        marginBottom:15, 
    },

    //UPLOAD

    uploadContainer:{
        position: 'relative',
        width: '85%',
        alignSelf: 'center',
        marginBottom: 120,
        justifyContent: 'center',
    },

    uploadCover: {
        width: '100%',
        backgroundColor: 'white',
        height: 182,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 15,
        marginBottom: 13,
    },

    textUploadCover: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: 'black',
        alignItems: 'center',
        textAlign: 'center',
    },

    uploadProfile: {
        position: 'absolute',
        top: '50%',
        left: '20%',
        right: '20%',
        width: 182,
        height: 182,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 6,
        borderColor: '#F4F4F4',
        backgroundColor: 'white',
    },

    textUploadProfile: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },

    buttonUploadProfile:{


    },
})