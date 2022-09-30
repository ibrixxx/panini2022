import {StyleSheet, View, ImageBackground, Text, Pressable} from 'react-native';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {useState} from "react";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {scale, verticalScale} from "react-native-size-matters";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";
import {useFocusEffect} from "@react-navigation/native";
import {AllCards} from "../data/CardData";
import {useUser, useUserUpdate} from "../context/Context";
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '@env';

Geocoder.init(GOOGLE_API_KEY)

export default function ProfileScreen() {
    const cards = useRecoilValue(myCards)
    const user = useUser()
    const updateUser = useUserUpdate()
    const [myAlbumCards, setMyCards] = useState(0)
    const [duplicates, setDuplicates] = useState(0)
    const [location, setLocation] = useState('')

    useFocusEffect(() => {
        traverseCards()
        if(!location)
            Geocoder.from(JSON.parse( user.location?? user.photoURL)).then(json => {
                const addressComponent = json.results[0].address_components[1].long_name + ', ' + json.results[0].address_components[2].long_name;
                setLocation(addressComponent)
            }).catch(error => console.log(error));
    })

    const traverseCards = () => {
        let car = 0
        let dup = 0
        Object.keys(cards).forEach(key => {
            const amount = cards[key]
            if(amount > 1)
                dup += amount - 1
            car++
        })
        setMyCards(car)
        setDuplicates(dup)
    }

    const logOut = () => {
        updateUser(null)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <View style={styles.phone}>
                    <View style={styles.phone1}>
                        <Feather name="phone" size={24} color="white" />
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: scale(10)}}>{user.phoneNumber}</Text>
                    </View>
                    <View style={styles.phone2}>
                        <MaterialIcons onPress={logOut} name="logout" size={24} color="red" />
                    </View>
                </View>
                <Pressable style={styles.location}>
                    <MaterialIcons name="location-on" size={24} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginLeft: scale(10)}}>{location}</Text>
                </Pressable>
                <View style={styles.data}>
                    <View style={{marginRight: scale(10), alignItems: 'center'}}>
                        <AnimatedCircularProgress
                            size={100}
                            width={14}
                            fill={Math.round((myAlbumCards/AllCards.length) * 100)}
                            tintColor={"#55ff00"}
                            backgroundColor="firebrick">
                            {
                                (fill) => (
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
                                        { fill }%
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={{color: 'white', fontSize: 14, fontStyle: 'italic'}}>sakupljeno</Text>
                    </View>
                    <View style={{marginLeft: scale(10), alignItems: 'center'}}>
                        <AnimatedCircularProgress
                            size={100}
                            width={14}
                            fill={Math.round((duplicates/myAlbumCards) * 100)}
                            tintColor={"dodgerblue"}
                            backgroundColor={"#3d5875"}>
                            {
                                (fill) => (
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                                        { duplicates } / {myAlbumCards}
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={{color: 'white', fontSize: 14, fontStyle: 'italic'}}>duplikati</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(150),
        paddingHorizontal: scale(40)
    },
    location: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
        padding: scale(14),
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        width: '100%',
        marginBottom: verticalScale(10)
    },
    data: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        padding: scale(20),
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
    },
    phone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: verticalScale(10)
    },
    phone1: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: scale(2),
        height: '100%',
    },
    phone2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'red',
        marginLeft: scale(2),
        height: '100%',
    }
});
