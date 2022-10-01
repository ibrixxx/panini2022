import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Team from "../components/Team";
import {AllCards, CardData} from "../data/CardData";
import {scale, verticalScale} from 'react-native-size-matters'
import {ProgressBar} from "react-native-paper";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";

export default function GroupScreen({route}) {
    const {group} = route.params
    const cards = useRecoilValue(myCards)
    const getData = () => {
        switch (group) {
            case 'A':
                return CardData.slice(1, 5)
            case 'B':
                return CardData.slice(5, 9)
            case 'C':
                return CardData.slice(9, 13)
            case 'D':
                return CardData.slice(13, 17)
            case 'E':
                return CardData.slice(17, 21)
            case 'F':
                return CardData.slice(21, 24)
            case 'G':
                return CardData.slice(24, 28)
            case 'H':
                return CardData.slice(28, 32)
        }
    }

    const renderItem = ({item}) => <Team team={item}/>

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
                    data={getData()}
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
