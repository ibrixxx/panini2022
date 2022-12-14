import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from "react";
import {useRecoilValue} from "recoil";
import {myCards} from "../atoms/MyCards";

function Card({tag, number, setChecked, setMyCards}) {
    const cards = useRecoilValue(myCards)

    const getColor = () => {
        return cards[tag+number]? '#269900':'firebrick'
    }

    const getBorderColor = () => {
        return cards[tag+number] > 1? 'dodgerblue':'black'
    }

    const isCompleted = () => {
        const limit = tag === 'FWC'? 30:19
        let counter = 1
        Object.keys(cards).forEach(key => {
            if(key.substring(0, 3) === tag)
                counter++
        })
        return counter === limit
    }

    const onPress = () => {
        const amount = cards[tag+number]
        if(amount) {
            setMyCards(tag+number, amount + 1)
        }
        else
            setMyCards(tag+number, 1)
        if(isCompleted())
            setChecked(true)
    }

    const onLongPress = () => {
        const amount = cards[tag+number]
        if(!amount)
            return
        setMyCards(tag+number, amount -1)
        if(!isCompleted())
            setChecked(false)
    }

    if(number === '20' && tag !== 'FWC')
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
        <Pressable onPress={onPress} onLongPress={onLongPress} style={[styles.container, {backgroundColor: getColor(), borderColor: getBorderColor()}]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.number}>{number === '0'? '00' : number}</Text>
            </View>
            <Text style={styles.number2}>{cards[tag+number]?? 0}</Text>
        </Pressable>
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
