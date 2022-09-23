import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";

export default function Card({tag, number, amount}) {
    const [color, setColor] = useState('firebrick')

    const onPress = () => {
        if(color === 'firebrick')
            setColor('#269900')
        else
            setColor('firebrick')
    }

    if(number === 20)
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
        <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: color}]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.number}>{number}</Text>
            </View>
            <Text style={styles.number2}>0</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderColor: 'black',
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
