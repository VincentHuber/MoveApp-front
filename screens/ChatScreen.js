
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';



export default function ChatScreen ({ navigation }){
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
            <Image source={require('../assets/Chat.jpg')} style={{ width: 350, height: 800 }}/>
            </View>
        </ScrollView>
    );

    
};

const styles = StyleSheet.create({

    container: {
      flexGrow: 1,
      paddingHorizontal: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4F4F4',
    },

    backButton: {
        position: 'absolute',
        top: 100,
        left: 20,
        Index: 1,
      },

      backButtonText: {
        color: '#4A46FF',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
      },

      inputContainer: {
        width: '90%',
        marginHorizontal: 0,
        marginTop: 130,
      },
});