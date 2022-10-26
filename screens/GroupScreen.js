import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Team from "../components/Team";
import {CardData} from "../data/CardData";
import {scale, verticalScale} from 'react-native-size-matters'
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";
import MyProgressBar from "../components/ProgressBar";

export default function GroupScreen({route}) {
    const {group} = route.params
    const cards = useRecoilValue(myCards)

    const getData = () => {
        switch (group) {
            case 'Group A':
                return CardData.slice(1, 5)
            case 'Group B':
                return CardData.slice(5, 9)
            case 'Group C':
                return CardData.slice(9, 13)
            case 'Group D':
                return CardData.slice(13, 17)
            case 'Group E':
                return CardData.slice(17, 21)
            case 'Group F':
                return CardData.slice(21, 25)
            case 'Group G':
                return CardData.slice(25, 29)
            case 'Group H':
                return CardData.slice(29, 33)
            default:
                return CardData.slice(0, 1)
        }
    }

    const renderItem = ({item}) => <Team team={item}/>

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <MyProgressBar cards={cards}/>
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
