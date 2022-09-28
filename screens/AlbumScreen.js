import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Team from "../components/Team";
import {AllCards, CardData} from "../data/CardData";
import {scale, verticalScale} from 'react-native-size-matters'
import {ProgressBar} from "react-native-paper";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";
import {useEffect} from "react";
import {getDatabase, ref, onValue} from "firebase/database";

export default function AlbumScreen() {
    const cards = useRecoilValue(myCards)

    useEffect(() => {
        const db = getDatabase();
        const reference = ref(db, 'users');
        onValue(reference, (snapshot) => {
            const res = snapshot.val();
            console.log("Res: " + JSON.stringify(res));
        });
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <View style={styles.progress}>
                    <ProgressBar
                        progress={(cards? Object.keys(cards).length : 0)/AllCards.length}
                        color={'#269900'}
                        style={{height: verticalScale(10)}}
                    />
                    <Text style={{color: 'white', fontStyle: 'italic', position: 'absolute', top: verticalScale(20), right: scale(10)}}>{cards? Object.keys(cards).length : 0}/{AllCards.length}</Text>
                </View>
                <FlatList
                    data={CardData}
                    renderItem={({item}) => <Team team={item}/>}
                    keyExtractor={item => item.tag}
                />
            </ImageBackground>
        </View>
    );
}

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
