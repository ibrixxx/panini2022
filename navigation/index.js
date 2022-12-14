import {useUser, useUserUpdate} from "../context/Context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {collectorsData, myCards} from "../atoms/MyCards";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {scale, verticalScale} from "react-native-size-matters";
import MyProgressBar from "../components/ProgressBar";

const Main = () => {
    const user = useUser()
    const userUpdate = useUserUpdate()
    const [cards, setCards] = useRecoilState(myCards)
    const [data, setData] = useRecoilState(collectorsData)
    const [ready, setReady] = useState(false)

    const generateSum = obj => {
        let sum = 0
        if(!obj)
            return 0
        Object.keys(obj).forEach(key => {
            sum += obj[key]
        })
        return sum
    }

    useEffect(() => {
        (async () => {
            let usr = null
            let savedCardsOnline = null
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
                setCards(jsonValue != null ? JSON.parse(jsonValue) : {})
                // console.log('jsonValue', jsonValue, savedCardsLength)
                if(usr || user) {
                    const db = getDatabase();
                    const reference = await ref(db, 'users');
                    await onValue(reference, async (snapshot) => {
                        const res = snapshot.val();
                        // console.log("Res: " + JSON.stringify(res));
                        setData(res)
                        await AsyncStorage.setItem('data', JSON.stringify(res))
                        savedCardsOnline = user ? res[user?.phoneNumber].cards : res[usr?.phoneNumber].cards
                        const savedCardsAsync = await AsyncStorage.getItem('cards')
                        if (generateSum(JSON.parse(savedCardsAsync)) < generateSum(savedCardsOnline)) {
                            setCards(prev => savedCardsOnline)
                        }
                        if (generateSum(JSON.parse(savedCardsAsync)) > generateSum(savedCardsOnline)) {
                            // console.log('t2')
                            const reference = ref(db, 'users/' + usr?.phoneNumber ?? user?.phoneNumber);
                            set(reference, {
                                cards: JSON.parse(jsonValue),
                                location: {
                                    lat: JSON.parse(usr?.location ?? user.location)?.lat,
                                    lng: JSON.parse(usr?.location ?? user.location)?.lng
                                }
                            }).catch(e => console.log(e));
                        }
                    });
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
                    <MyProgressBar cards={cards}/>
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
