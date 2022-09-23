import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import Team from "../components/Team";
import {useState} from "react";
import {CardData} from "../data/CardData";
import {verticalScale} from 'react-native-size-matters'

export default function AlbumScreen() {
    const [teams, setTeams] = useState([])

    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://www.unotv.com/uploads/2022/07/fondo-02-175001.jpg'}} resizeMode="cover" style={styles.image}>
                <FlatList
                    data={CardData}
                    style={{marginTop: verticalScale(20)}}
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
});
