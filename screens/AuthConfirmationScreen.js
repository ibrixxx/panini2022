import {Text, View, Alert, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import {PhoneAuthProvider, signInWithCredential} from 'firebase/auth'
import {useUserUpdate} from "../context/Context";
import { updateProfile } from "firebase/auth"
import {scale, verticalScale} from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthConfirmationScreen({route}) {
    const setUser = useUserUpdate()
    const {verificationID, location, auth} = route.params
    const [code, setCode] = useState('')

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(
            verificationID,
            code
        )
        signInWithCredential(auth, credential)
            .then(res => {
                setUser({...res.user, location: JSON.stringify(location)})
                storeUser({...res.user, location: JSON.stringify(location)}).catch(e => console.log(e))
                updateProfile(res.user, {
                    photoURL: JSON.stringify(location)})
                .then(() => {
                    setCode('')
                })
                .catch((error) => {
                    console.log(error)
                });
            })
            .catch(err => {
                console.log(err)
            })
        // Alert.alert('Uspješna prijava!')
    }

    const storeUser = async user => {
        try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem('user', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <TextInput
                    autoCapitalize={'none'}
                    placeholder={'*** ***'}
                    onChangeText={setCode}
                    lable={'code'}
                    style={styles.input}
                    mode={'outlined'}
                    activeOutlineColor={'gold'}
                    outlineColor={'whitesmoke'}
                    theme={{ colors: { text: 'white', placeholder: 'gray', label: 'white'}}}
                />
                <TouchableOpacity
                    onPress={confirmCode}
                    style={styles.button}
                >
                    <Text style={{color: 'gold', fontWeight: 'bold'}}>
                        POTVRDI
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: verticalScale(150),
        paddingHorizontal: scale(20)
    },
    input: {
        borderRadius: scale(12),
        marginBottom: verticalScale(10),
        backgroundColor: 'black',
        color: 'white'
    },
    button: {
        backgroundColor: 'rgba(153, 0, 51, 0.5)',
        color: 'gold',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(12)
    }
});
