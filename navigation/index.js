import {useUser, useUserUpdate} from "../context/Context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {collectorsData, myCards} from "../atoms/MyCards";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {ProgressBar} from "react-native-paper";
import {AllCards} from "../data/CardData";
import {scale, verticalScale} from "react-native-size-matters";

const Main = () => {
    const user = useUser()
    const userUpdate = useUserUpdate()
    const [cards, setCards] = useRecoilState(myCards)
    const [data, setData] = useRecoilState(collectorsData)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        (async () => {
            let usr = null
            let savedCards = null
            if(!user)
                try {
                    const jsonValue = await AsyncStorage.getItem('user')
                    userUpdate(jsonValue != null ? JSON.parse(jsonValue) : null)
                    usr = jsonValue != null ? JSON.parse(jsonValue) : null
                }
                catch(e) {
                    console.log(e)
                }
            try {
                const jsonValue = await AsyncStorage.getItem('cards')
                const savedCardsLength = jsonValue != null ? Object.keys(JSON.parse(jsonValue)).length : 0
                // console.log('jsonValue', jsonValue, savedCardsLength)
                const db = getDatabase();
                const reference = ref(db, 'users');
                await onValue(reference, (snapshot) => {
                    const res = snapshot.val();
                    // console.log("Res: " + JSON.stringify(res));
                    setData(res)
                    savedCards = user? res[user?.phoneNumber].cards : res[usr?.phoneNumber].cards
                });
                // console.log(cards)
                if(!cards) {
                    console.log(savedCards, savedCardsLength)
                    if(savedCards && savedCardsLength < Object.keys(savedCards).length)
                        setCards(savedCards)
                    else {
                        setCards(jsonValue != null ? JSON.parse(jsonValue) : {})
                        const db = getDatabase();
                        const reference = ref(db, 'users/' + usr.phoneNumber);
                        set(reference, {
                            cards: JSON.parse(jsonValue),
                            location: {lat: JSON.parse(usr.location?? usr.photoURL)?.lat, lng: JSON.parse(usr.location?? usr.photoURL)?.lng}
                        }).then(r => console.log('r ', r)).catch(e => console.log(e));
                    }
                }
                setReady(true)
            }
            catch(e) {
                console.log(e)
            }
        })()
    }, [])

    if(!ready)
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                    <View style={styles.progress}>
                        <ProgressBar
                            progress={0/AllCards.length}
                            color={'#269900'}
                            style={{height: verticalScale(10)}}
                            indeterminate={true}
                        />
                        <Text style={{color: 'white', fontStyle: 'italic', position: 'absolute', top: verticalScale(20), right: scale(10)}}>0/{AllCards.length}</Text>
                    </View>
                </ImageBackground>
            </View>
        )

    return user? <AppNavigation /> : <AuthNavigation />
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    progress: {
        marginTop: verticalScale(20),
        padding: scale(10),
        height: verticalScale(40),
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        borderRadius: 7,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: scale(5)
    }
});
