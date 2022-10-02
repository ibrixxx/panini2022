import {StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters'
import {AllCards} from "../data/CardData";
import {ProgressBar} from "react-native-paper";

export default function MyProgressBar({cards}) {

    return (
        <View style={styles.progress}>
            <ProgressBar
                progress={(cards? Object.keys(cards).length : 0)/AllCards.length}
                color={'#55ff00'}
                style={{height: verticalScale(10), borderRadius: 5, borderColor: 'green', borderWidth: 0.5}}
            />
            <Text style={{color: 'white', fontStyle: 'italic', position: 'absolute', top: verticalScale(20), right: scale(10)}}>{cards? Object.keys(cards).length : 0}/{AllCards.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
