import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState, memo} from "react";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";

function Card({tag, number, setChecked, setAlbumCards}) {
    const cards = useRecoilValue(myCards)
    const [color, setColor] = useState(cards[tag].get(tag+number)? '#269900':'firebrick')
    const [borderColor, setBorderColor] = useState(cards[tag].get(tag+number) > 1? 'dodgerblue':'black')

    const getColor = () => {
        return cards[tag].get(tag+number)? '#269900':'firebrick'
    }

    const isCompleted = () => {
        const limit = tag === 'FWC'? 30:19
        for(let i = 1; i <= limit; i++) {
            if(!cards[tag].get(tag+i))
                return false
        }
        return true
    }

    const onPress = () => {
        const amount = cards[tag].get(tag+number)
        if(!amount) {
            setColor('#269900')
            setAlbumCards(prev => prev + 1)
        }
        else
            setBorderColor('dodgerblue')
        cards[tag].set(tag+number, amount + 1)
        if(isCompleted())
            setChecked(true)
    }

    const onLongPress = () => {
        const amount = cards[tag].get(tag+number)
        if(!amount)
            return
        cards[tag].set(tag+number, amount - 1)
        if(amount - 1 <= 1) {
            setBorderColor('black')
            if (amount - 1 === 0) {
                setColor('firebrick')
                setAlbumCards(prev => prev - 1)
            }
        }
        if(!isCompleted())
            setChecked(false)
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
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.container, {backgroundColor: getColor(), borderColor: borderColor}]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.number}>{number === 30? '00' : number}</Text>
            </View>
            <Text style={styles.number2}>{cards[tag].get(tag+number)}</Text>
        </TouchableOpacity>
    );
}

export default memo(Card)

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
