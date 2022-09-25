import {StyleSheet, View, ImageBackground, Text, Pressable} from 'react-native';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {useState} from "react";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {scale, verticalScale} from "react-native-size-matters";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";
import {useFocusEffect} from "@react-navigation/native";
import {AllCards} from "../data/CardData";

export default function ProfileScreen() {
    const cards = useRecoilValue(myCards)
    const [myAlbumCards, setMyCards] = useState(0)
    const [duplicates, setDuplicates] = useState(0)

    useFocusEffect(() => {
        traverseCards()
    })

    const traverseCards = () => {
        let car = 0
        let dup = 0
        Object.keys(cards).forEach(key => {
            if(key === 'FWC') {
                for(let i = 1; i<=30; i++) {
                    const pom = cards[key].get(key+i)
                    if(pom > 0)
                        car += 1
                    if(pom > 1)
                        dup += pom -1
                }
            }
            else {
                for(let i = 1; i<=19; i++) {
                    const pom = cards[key].get(key+i)
                    if(pom > 0)
                        car += 1
                    if(pom > 1)
                        dup += pom -1
                }
            }
        })
        setMyCards(car)
        setDuplicates(dup)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://www.unotv.com/uploads/2022/07/fondo-02-175001.jpg'}} resizeMode="cover" style={styles.image}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Ionicons name="person-outline" size={24} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: scale(10)}}>Makelele</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Feather name="phone" size={24} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: scale(10)}}>+38761250344</Text>
                </View>
                <Pressable style={styles.location}>
                    <MaterialIcons name="location-on" size={24} color="white" />
                    <Text style={{color: 'white', fontSize: 14}}>Sarajevo, Bosnia and Herzegovina</Text>
                </Pressable>
                <View style={{flexDirection: 'row', backgroundColor: 'rgba(52, 52, 52, 0.5)', padding: scale(20), borderRadius: 6}}>
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
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(150)
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'whitesmoke',
        padding: scale(14)
    }
});
