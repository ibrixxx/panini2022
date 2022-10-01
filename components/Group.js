import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters'
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function Group({item}) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('GroupScreen', {group: item.name})} style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.name}>Group {item.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {item.flags.map(flag => <Text key={flag} style={styles.flag}>{flag}</Text>)}
                </View>
                <Ionicons name="enter-outline" size={24} color="white" />
            </View>
        </TouchableOpacity>
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
    },
    flag: {
        fontSize: 24,
        marginHorizontal: scale(5)
    },
    name: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});
