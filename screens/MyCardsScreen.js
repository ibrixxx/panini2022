import {FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from "react-native-size-matters";
import {Caption, Title} from "react-native-paper";
import AddBanner from "../components/AddBanner";
import {getDatabase, ref, set} from "firebase/database";
import {useRecoilState} from "recoil";
import {myCards} from "../atoms/MyCards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../context/Context";
import {useState} from "react";
import {Feather, FontAwesome} from "@expo/vector-icons";

export default function MyCardsScreen({route}) {
    const {data, title, duplicates} = route.params
    const db = getDatabase()
    const user = useUser()
    const [cards, setCards] = useRecoilState(myCards)
    const [displayData, setData] = useState(data)
    const [filteredData, setFiltered] = useState(displayData)
    const [search, setSearch] = useState('')

    const storeDataToDatabase = obj => {
        const reference = ref(db, 'users/' + user.phoneNumber);
        set(reference, {
            cards: obj,
            location: {lat: JSON.parse(user.location)?.lat, lng: JSON.parse(user.location)?.lng}
        }).catch(e => console.log(e));
    }

    const onSmesh = async item => {
        let temp = {...cards}
        temp[item] = 1
        setCards(temp)
        try {
            const jsonValue = JSON.stringify(temp)
            await AsyncStorage.setItem('cards', jsonValue)
        } catch (e) {
            console.log('async err', e)
        }
        storeDataToDatabase(temp)
        setData(displayData.filter(e => e !== item))
        if(search)
            setFiltered(filteredData.filter(e => e !== item))
    }

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => onSmesh(item, index)} style={styles.listItem}>
                <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>{item}</Caption>
                {
                    title === 'Missing'?
                    <Feather style={{marginRight: scale(5)}} name="plus-circle" size={20} color="green" />
                        :
                    <FontAwesome style={{marginRight: scale(5)}} name="remove" size={20} color="red" />
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpeg')} resizeMode="cover" style={styles.image}>
                <View style={styles.listItem2}>
                    <Caption style={{color: 'whitesmoke', fontStyle: 'italic'}}>{title}</Caption>
                    {title === 'Missing'?
                        <Title style={{color: 'white'}}>{displayData?.length}</Title>
                        :
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Title style={{color: 'white'}}>{duplicates}</Title>
                            <Text style={{color: 'white'}}> / </Text>
                            <Caption style={{color: 'lightgray'}}>{displayData?.length} unique</Caption>
                        </View>
                    }
                </View>
                <TextInput
                    placeholder={'search...'}
                    placeholderTextColor={'whitesmoke'}
                    style={{backgroundColor: 'rgba(252, 252, 252, 0.15)', width: '100%', color: 'white', borderWidth: 1, padding: scale(5), borderColor: 'gray', borderBottomRightRadius: scale(10), borderBottomLeftRadius: scale(10), marginBottom: verticalScale(5)}}
                    value={search}
                    autoCapitalize={'characters'}
                    onChangeText={txt => {
                        setSearch(txt)
                        setFiltered(displayData.filter(d => d.includes(txt.toUpperCase())))
                    }}
                />
                <FlatList
                    data={search? filteredData:displayData}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={{width: '100%', marginBottom: verticalScale(20)}}
                />
                <AddBanner />
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
        paddingTop: verticalScale(40),
        paddingHorizontal: scale(40)
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
