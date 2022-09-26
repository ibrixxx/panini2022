import {Text, View, Alert, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import {useEffect, useRef, useState} from "react";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import firebase from "firebase/compat";
import {firebaseConfig} from "../firebase";
import {TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {scale, verticalScale} from "react-native-size-matters";
// import { GOOGLE_API_KEY } from '@env';
// import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
// import {AntDesign} from "@expo/vector-icons";
import * as Location from 'expo-location';


export default function AuthScreen() {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const recaptchaVerifier = useRef(null)
    // const autocompleteRef = useRef(null)

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Odbili ste dati pristup lokaciji, cece vas moci naci drugi kolekcionari preko aplikacije.');
                Alert.alert(errorMsg)
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({lat: location.coords.latitude, lng: location.coords.longitude});
        })();
    }, []);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider()
        phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier?.current)
            .then(res => {
                navigation.navigate('ConfirmationScreen', {verificationID: res, location: location, username: username})
            })
        setPhone('')
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://www.unotv.com/uploads/2022/07/fondo-02-175001.jpg'}} resizeMode="cover" style={styles.image}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <View>
                    <TextInput
                        placeholder={'+3876* *** ***'}
                        onChangeText={setPhone}
                        keyboardType={'phone-pad'}
                        autoCompleteType={'tel'}
                        lable={'broj telefona'}
                        style={styles.input}
                        mode={'outlined'}
                        activeOutlineColor={'gold'}
                        outlineColor={'whitesmoke'}
                        theme={{ colors: { text: 'white', placeholder: 'gray', label: 'white'}}}
                    />
                    <TextInput
                        autoCapitalize={'none'}
                        placeholder={'name'}
                        onChangeText={setUsername}
                        lable={'nick'}
                        style={styles.input}
                        mode={'outlined'}
                        activeOutlineColor={'gold'}
                        outlineColor={'whitesmoke'}
                        theme={{ colors: { text: 'white', placeholder: 'gray', label: 'white'}}}
                    />
                    {/*<GooglePlacesAutocomplete*/}
                    {/*    ref={autocompleteRef}*/}
                    {/*    placeholder='Moja lokacija'*/}
                    {/*    currentLocation={true}*/}
                    {/*    currentLocationLabel={'Trenutna lokacija'}*/}
                    {/*    onPress={(data, details = null) => {*/}
                    {/*        console.log(*/}
                    {/*             details?.geometry.location,*/}
                    {/*             data.description,*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*    styles={{*/}
                    {/*        container: {*/}
                    {/*            flex: 0,*/}
                    {/*            width: '100%',*/}
                    {/*            backgroundColor: 'black',*/}
                    {/*            borderRadius: 6,*/}
                    {/*            borderColor: 'white',*/}
                    {/*            borderWidth: 1*/}
                    {/*        },*/}

                    {/*        textInput: {*/}
                    {/*            backgroundColor: 'black',*/}
                    {/*            color: 'white',*/}
                    {/*            height: 44,*/}
                    {/*            borderRadius: 6,*/}
                    {/*            paddingVertical: 5,*/}
                    {/*            paddingHorizontal: 10,*/}
                    {/*            fontSize: 15,*/}
                    {/*            flex: 1,*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    listEmptyComponent={() => (*/}
                    {/*        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}
                    {/*            <Text style={{color: 'white'}}>No results were found</Text>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    {/*    renderRightButton={() => <AntDesign style={{paddingTop: scale(10), paddingRight: scale(10)}} name="close" size={24} color="white" onPress={() => autocompleteRef.current.clear()}/>}*/}
                    {/*    fetchDetails={true}*/}
                    {/*    enablePoweredByContainer={false}*/}
                    {/*    enableHighAccuracyLocation={true}*/}
                    {/*    minLength={2}*/}
                    {/*    nearbyPlacesAPI='GoogleReverseGeocoding'*/}
                    {/*    debounce={350}*/}
                    {/*    query={{*/}
                    {/*        key: GOOGLE_API_KEY,*/}
                    {/*        language: 'en',*/}
                    {/*        types: '(cities)'*/}
                    {/*    }}*/}
                    {/*    renderDescription={row => row.description || row.formatted_address || row.name}*/}
                    {/*/>*/}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={sendVerification}
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
