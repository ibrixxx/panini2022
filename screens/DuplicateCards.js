import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {scale, verticalScale} from "react-native-size-matters";
import {Caption, Title} from "react-native-paper";

export default function DuplicateCards({route}) {
    const {data, phone, number} = route.params

    const renderItem = ({item}) => {
        return (
            <View style={styles.listItem}>
                <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>{item}</Caption>
                <Title style={{color: 'white'}}>{data.cards[item]-1}x</Title>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <View style={styles.item}>
                    <Feather name="phone" size={24} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: scale(10)}}>{phone}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.data}>
                        <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>Has</Caption>
                        <Title style={{color: 'white'}}>{Object.keys(data.cards).length}</Title>
                    </View>
                    <View style={styles.data}>
                        <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>Your duplicates</Caption>
                        <Title style={{color: 'white'}}>{number}</Title>
                    </View>
                </View>
                {
                    Object.keys(data.cards).length > 0 &&
                    <View style={styles.listItem2}>
                        <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>Duplicate cards you don't have:</Caption>
                        <Title style={{color: 'white'}}>{Object.keys(data.cards).length}</Title>
                    </View>
                }
                <FlatList
                    data={Object.keys(data.cards)}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={{width: '100%'}}
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
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: verticalScale(40),
        paddingHorizontal: scale(40)
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        padding: scale(10),
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        width: '100%',
    },
    data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        padding: scale(14),
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        width: '100%',
        marginBottom: verticalScale(10)
    },
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        padding: scale(4),
        paddingHorizontal: scale(10),
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    listItem2: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        padding: scale(4),
        paddingHorizontal: scale(10),
        backgroundColor: 'rgba(52, 52, 52, 0.55)',
    }
});
