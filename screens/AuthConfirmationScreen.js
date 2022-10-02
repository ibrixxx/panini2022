import {Text, View, Alert, TouchableOpacity, StyleSheet, ImageBackground, Keyboard, Pressable} from "react-native";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import {PhoneAuthProvider, signInWithCredential} from 'firebase/auth'
import {useUser, useUserUpdate} from "../context/Context";
import { updateProfile } from "firebase/auth"
import {scale, verticalScale} from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {collectorsData, myCards} from "../atoms/MyCards";
import {getDatabase, onValue, ref} from "firebase/database";

export default function AuthConfirmationScreen({route}) {
    const user = useUser()
    const setUser = useUserUpdate()
    const {verificationID, location, auth} = route.params
    const [cards, setCards] = useRecoilState(myCards)
    const [data, setData] = useRecoilState(collectorsData)
    const [code, setCode] = useState('')

    const generateSum = obj => {
        let sum = 0
        if(!obj)
            return 0
        Object.keys(obj).forEach(key => {
            sum += obj[key]
        })
        return sum
    }

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(
            verificationID,
            code
        )
        signInWithCredential(auth, credential)
            .then(res => {
                const newUser = {...res.user, location: JSON.stringify(location)}
                if(user !== newUser) {
                    setUser(newUser)
                    storeUser(newUser).catch(e => console.log(e))
                    const db = getDatabase();
                    const reference = ref(db, 'users');
                    onValue(reference, (snapshot) => {
                        const res = snapshot.val();
                        if(!Object.keys(data).length)
                            setData(res)
                        if (generateSum(cards) < generateSum(res[newUser?.phoneNumber]?.cards))
                            setCards(res[newUser?.phoneNumber]?.cards)
                    })
                }
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
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
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
        </Pressable>
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
