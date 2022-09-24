import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {Circle} from "react-native-svg";
import {useCards} from "../context/Context";
import {useEffect, useState} from "react";
import {AllCards} from "../data/CardData";

export default function ProfileScreen() {
    const cards = useCards()
    const [myCards, setMyCards] = useState(0)
    const [duplicates, setDuplicates] = useState(0)

    useEffect(() => {
        traverseCards()
    }, [cards])

    const traverseCards = () => {
        let car = 0
        let dup = 0
        Object.keys(cards).forEach(key => {
            if(key === 'FWC') {
                for(let i = 1; i<=30; i++) {
                    const pom = cards[key].get(key+i)
                    if(pom > 0)
                        car += pom
                    if(pom > 1)
                        dup += pom -1
                }
            }
            else {
                for(let i = 1; i<=19; i++) {
                    const pom = cards[key].get(key+i)
                    if(pom > 0)
                        car += pom
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
                <AnimatedCircularProgress
                    size={200}
                    width={32}
                    fill={myCards}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
                                { fill }
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
                <AnimatedCircularProgress
                    size={200}
                    width={32}
                    fill={duplicates}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
                                { fill }
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
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
        justifyContent: "center",
        alignItems: 'center'
    },
});
