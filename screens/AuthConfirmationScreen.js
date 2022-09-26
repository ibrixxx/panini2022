import {Text, View, Alert, TouchableOpacity} from "react-native";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import firebase from "firebase/compat";

export default function AuthConfirmationScreen({route}) {
    const {verificationID} = route.params
    const [code, setCode] = useState('')

    const confirmCode = () => {
        console.log('m ', verificationID)
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationID,
            code
        )
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('')
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
