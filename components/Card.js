import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {useCards} from "../context/Context";

function Card({tag, number}) {
    const cards = useCards()
    const [color, setColor] = useState(cards[tag].get(tag+number)? '#269900':'firebrick')
    const [borderColor, setBorderColor] = useState(cards[tag].get(tag+number) > 1? 'dodgerblue':'black')

    const onPress = () => {
        const amount = cards[tag].get(tag+number)
        if(!amount)
            setColor('#269900')
        else
            setBorderColor('dodgerblue')
        cards[tag].set(tag+number, amount + 1)
    }

    const onLongPress = () => {
        const amount = cards[tag].get(tag+number)
        if(!amount)
            return
        cards[tag].set(tag+number, amount - 1)
        if(amount - 1 <= 1) {
            setBorderColor('black')
            if (amount - 1 === 0)
                setColor('firebrick')
        }
    }

    if(number === 20 && tag !== 'FWC')
        return (
            <View style={[styles.container, {opacity: 0}]}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.tag}>{tag}</Text>
                    <Text style={styles.number}>{number}</Text>
                </View>
                <Text style={styles.number2}>0</Text>
            </View>
        )

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.container, {backgroundColor: color, borderColor: borderColor}]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.number}>{number === 30? '00' : number}</Text>
            </View>
            <Text style={styles.number2}>{cards[tag].get(tag+number)}</Text>
        </TouchableOpacity>
    );
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        margin: 5,
        paddingVertical: 3
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11
    },
    number2: {
        color: 'white',
        fontSize: 7
    },
    tag: {
        color: 'white',
        fontSize: 7,
        fontWeight: 'bold',
        marginBottom: -3
    }
});
