import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Team from "../components/Team";
import {AllCards, CardData, GroupData} from "../data/CardData";
import {scale, verticalScale} from 'react-native-size-matters'
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";
import Group from "../components/Group";
import MyProgressBar from "../components/ProgressBar";

export default function AlbumScreen() {
    const cards = useRecoilValue(myCards)

    const renderItem = ({item}) => <Group item={item}/>

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <MyProgressBar cards={cards}/>
                <Team team={CardData[0]} />
                <FlatList
                    data={GroupData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.name + index}
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
        marginTop: verticalScale(25),
        padding: scale(10),
        height: verticalScale(40),
        backgroundColor: 'rgba(52, 52, 52, 0.25)',
        borderRadius: 7,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: scale(5)
    }
});
