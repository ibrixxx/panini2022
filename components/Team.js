import {memo, useState} from "react";
import {StyleSheet, Text, View} from 'react-native';
import ExpoCheckbox from "expo-checkbox";
import Card from "./Card";
import {scale} from 'react-native-size-matters'
import {CardNumbers, FWCardNumbers} from "../data/CardData";
import {useRecoilState} from "recoil";
import {myCards} from "../atoms/MyCards";


function Team({team, setAlbumCards}) {
    const [cards, setCards] = useRecoilState(myCards)
    const [checked, setChecked] = useState(() => {
        const limit = team.tag === 'FWC'? 30:19
        for(let i = 1; i <= limit; i++) {
            if(!cards[team.tag].get(team.tag+i))
                return false
        }
        return true
    })

    const onCheck = val => {
        if(val) {
            const limit = team.tag === 'FWC'? 30:19
            let temp = cards
            for(let i = 1; i <= limit; i++) {
                const amount = temp[team.tag].get(team.tag+i)
                if(amount === 0)
                    temp[team.tag].set(team.tag+i, amount + 1)
                setCards(temp)
            }
        }
        else {
            const limit = team.tag === 'FWC'? 30:19
            let temp = cards
            for(let i = 1; i <= limit; i++) {
                const amount = temp[team.tag].get(team.tag+i)
                temp[team.tag].set(team.tag+i, amount - 1)
                setCards(temp)
            }
        }
        setChecked(val)
    }

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
                {
                    FWCardNumbers.map((row, index) => {
                            return (
                                <View key={index} style={{flexDirection: 'row'}}>
                                    {row.map(item => <Card key={team.tag + item}  tag={team.tag} number={item} setChecked={setChecked} setAlbumCards={setAlbumCards}/>)}
                                </View>
                            )
                        }
                    )
                }
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
            {
                CardNumbers.map((row, index) => {
                    return (
                        <View key={index} style={{flexDirection: 'row'}}>
                            {row.map(item => <Card key={team.tag + item}  tag={team.tag} number={item} setChecked={setChecked} setAlbumCards={setAlbumCards}/>)}
                        </View>
                    )
                })
            }
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
