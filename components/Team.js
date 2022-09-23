import {StyleSheet, Text, View} from 'react-native';
import ExpoCheckbox from "expo-checkbox";
import Card from "./Card";
import {scale} from 'react-native-size-matters'
import {CardNumbers} from "../data/CardData";

export default function Team({team}) {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.flag}>{team.flag}</Text>
                    <Text style={styles.name}>{team.name}</Text>
                </View>
                <ExpoCheckbox
                    value={false}
                    color={false ? '#4630EB' : undefined}
                    style={{marginHorizontal: scale(10), borderColor: 'black', backgroundColor: 'whitesmoke'}}
                />
            </View>
            {
                CardNumbers.map((row, index) => {
                    return (
                        <View key={index} style={{flexDirection: 'row'}}>
                            {row.map(item => <Card key={team.tag + item}  tag={team.tag} number={item}/>)}
                        </View>
                        )
                    }
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 7,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        padding: 4,
        marginHorizontal: 10,
    },
    flag: {
        fontSize: 24,
        marginHorizontal: scale(5)
    },
    name: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
});
