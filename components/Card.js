import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Card() {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.tag}>FRA</Text>
                <Text style={styles.number}>14</Text>
            </View>
            <Text style={styles.number2}>0</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'firebrick',
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
        fontSize: 9
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
