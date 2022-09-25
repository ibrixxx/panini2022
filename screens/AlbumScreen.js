import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Team from "../components/Team";
import {AllCards, CardData} from "../data/CardData";
import {scale, verticalScale} from 'react-native-size-matters'
import {ProgressBar} from "react-native-paper";
import {useState} from "react";

export default function AlbumScreen() {
    const [myAlbumCards, setAlbumCards] = useState(0)

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://www.unotv.com/uploads/2022/07/fondo-02-175001.jpg'}} resizeMode="cover" style={styles.image}>
                <View style={styles.progress}>
                    <ProgressBar
                        progress={myAlbumCards/AllCards.length}
                        color={'#269900'}
                        style={{height: verticalScale(10)}}
                    />
                    <Text style={{color: 'white', fontStyle: 'italic', position: 'absolute', top: verticalScale(20), right: scale(10)}}>{myAlbumCards}/{AllCards.length}</Text>
                </View>
                <FlatList
                    data={CardData}
                    renderItem={({item}) => <Team team={item} setAlbumCards={setAlbumCards}/>}
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
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: scale(5)
    }
});
