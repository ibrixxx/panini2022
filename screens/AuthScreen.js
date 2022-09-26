import {Text, View, Alert, TouchableOpacity} from "react-native";
import {useRef, useState} from "react";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import firebase from "firebase/compat";
import {firebaseConfig} from "../firebase";
import {TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export default function AuthScreen() {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const recaptchaVerifier = useRef(null)

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider()
        phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier?.current)
            .then(res => {
                console.log(res)
                navigation.navigate('ConfirmationScreen', {verificationID: res})
            })
        setPhone('')
    }


    return (
        <View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <TextInput
                placeholder={'Phone number'}
                onChangeText={setPhone}
                keyboardType={'phone-pad'}
                autoCompleteType={'tel'}
            />
            <TouchableOpacity
                style={{width: '100%', backgroundColor: 'red'}}
                onPress={sendVerification}
            >
                <Text>
                    SUBmIT
                </Text>
            </TouchableOpacity>
        </View>
    );
}
