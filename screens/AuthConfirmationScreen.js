import {Text, View, Alert, TouchableOpacity} from "react-native";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import firebase from "firebase/compat";
import {useUserUpdate} from "../context/Context";
import { updateProfile } from "firebase/auth"

export default function AuthConfirmationScreen({route}) {
    const setUser = useUserUpdate()
    const {verificationID, location, username} = route.params
    const [code, setCode] = useState('')

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationID,
            code
        )
        firebase.auth().signInWithCredential(credential)
            .then(res => {
                updateProfile(res.user, {
                    displayName: username, photoURL: JSON.stringify(location)})
                .then(() => {
                    setCode('')
                })
                .catch((error) => {
                    console.log(error)
                });
                setUser(res.user)
            })
            .catch(err => {
                console.log(err)
            })
        Alert.alert('login success')
    }

    return (
        <View>
            <TextInput
                placeholder={'***-***'}
                onChangeText={setCode}
                keyboardType={'phone-pad'}
            />
            <TouchableOpacity
                onPress={confirmCode}
                style={{width: '100%', backgroundColor: 'red'}}
            >
                <Text>
                    Confirm
                </Text>
            </TouchableOpacity>
        </View>
    );
}
