import {memo, useState} from "react";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ExpoCheckbox from "expo-checkbox";
import Card from "./Card";
import {scale} from 'react-native-size-matters'
import {useRecoilState} from "recoil";
import {myCards} from "../atoms/MyCards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../context/Context";
import { getDatabase, ref, set } from 'firebase/database';

function Team({team}) {
    const user = useUser()
    const [cards, setCards] = useRecoilState(myCards)
    const [checked, setChecked] = useState(() => {
        const limit = team.tag === 'FWC'? 30:19
        let counter = 1
        Object.keys(cards).forEach(key => {
            if(key.substring(0, 3) === team.tag)
                counter++
        })
        return counter >= limit
    })

    const storeChanges = obj => {
        (async () => {
            try {
                const jsonValue = JSON.stringify(obj)
                await AsyncStorage.setItem('cards', jsonValue)
            } catch (e) {
                console.log('async eerr', e)
            }
        })()
    }

    const storeDataToDatabase = obj => {
        const db = getDatabase();
        const reference = ref(db, 'users/' + user.phoneNumber);
        set(reference, {
            cards: obj,
            location: {lat: JSON.parse(user.location?? user.photoURL)?.lat, lng: JSON.parse(user.location?? user.photoURL)?.lng}
        }).catch(e => console.log(e));
    }

    const setMyCards = (tag, amount) => {
        let obj = {...cards}
        if(amount)
            obj[tag] = amount
        else
            delete obj[tag]
        setCards(obj)
        storeChanges(obj)
        storeDataToDatabase(obj)
    }

    const onCheck = val => {
        let temp = {...cards}
        if(val) {
            const limit = team.tag === 'FWC'? 30:19
            if(limit === 30) {
                const amount = temp[team.tag+'0']
                if(!amount)
                    temp[team.tag+'0'] = 1
            }
            for(let i = 1; i <= limit; i++) {
                const amount = temp[team.tag+i]
                if(!amount)
                    temp[team.tag+i] = 1
            }
        }
        else {
            const limit = team.tag === 'FWC'? 30:19
            if(limit === 30) {
                const amount = temp[team.tag+'0']
                if(amount <= 1)
                    delete temp[team.tag+'0']
                else
                    temp[team.tag+'0'] = amount - 1
            }
            for(let i = 1; i <= limit; i++) {
                const amount = temp[team.tag+i]
                if(amount <= 1)
                    delete temp[team.tag+i]
                else
                    temp[team.tag+i] = amount - 1
            }
        }
        setCards(temp)
        storeChanges(temp)
        storeDataToDatabase(temp)
        setChecked(val)
    }

    const renderItem = ({item}) => <Card tag={team.tag} number={item} setChecked={setChecked} setMyCards={setMyCards} />

    if(team.tag === 'FWC')
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.flag}>{team.flag}</Text>
                        <Text style={styles.name}>{team.name}</Text>
                    </View>
                    <ExpoCheckbox
                        value={checked}
                        color={checked ? '#4630EB' : undefined}
                        onValueChange={value => onCheck(value)}
                        style={{marginHorizontal: scale(10), borderColor: 'black', backgroundColor: 'whitesmoke'}}
                    />
                </View>
                <FlatList
                    data={['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']}
                    keyExtractor={item => team.tag + item}
                    numColumns={5}
                    renderItem={renderItem}
                    removeClippedSubviews={true}
                />
            </View>
        )

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.flag}>{team.flag}</Text>
                    <Text style={styles.name}>{team.name}</Text>
                </View>
                <ExpoCheckbox
                    value={checked}
                    color={checked ? '#4630EB' : undefined}
                    onValueChange={value => onCheck(value)}
                    style={{marginHorizontal: scale(10), borderColor: 'black', backgroundColor: 'whitesmoke'}}
                />
            </View>
            <FlatList
                data={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']}
                keyExtractor={item => team.tag + item}
                numColumns={5}
                renderItem={renderItem}
                removeClippedSubviews={true}
            />
        </View>
    );
}

export default memo(Team)

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
