import {StyleSheet, View, Dimensions, ImageBackground, Text} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {useUser} from "../context/Context";
import {useRecoilValue} from "recoil";
import {collectorsData, myCards} from "../atoms/MyCards";
import {scale, verticalScale} from "react-native-size-matters";
import { Avatar } from 'react-native-paper';
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

export default function MapScreen() {
    const user = useUser()
    const cards = useRecoilValue(myCards)
    const data = useRecoilValue(collectorsData)
    const [mapCards, setMapCards] = useState({})
    const navigation = useNavigation()

    useEffect(() => {
        let temp = {}
        Object.keys(data).forEach(key => {
            let tempData = {}
            Object.keys(data[key].cards).forEach(card => {
                if(!(card in cards) && data[key].cards[card] > 1) {
                    tempData[card] = data[key].cards[card]
                }
            })
            temp[key] = {
                cards: tempData,
                location: data[key].location
            }
        })
        setMapCards(temp)
    }, [])

    const renderMarker = number => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ImageBackground source={require('../assets/marker.png')} style={{height: verticalScale(40), width: scale(40), alignItems: 'center' }}>
                    <Avatar.Text style={{marginTop: verticalScale(4), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}} color={'dodgerblue'} size={scale(24)} label={number}/>
                </ImageBackground>
            </View>
        )
    }

    const onCalloutPress = item => {
        let number = 0
        Object.keys(cards).forEach(card => {
            if(!(card in data[item].cards) && cards[card] > 1) {
                number++
            }
        })
        navigation.navigate('DuplicateCards', {data: mapCards[item], phone: item, number: number})
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType={'mutedStandard'}
                initialRegion={{
                    latitude: JSON.parse(user.photoURL?? user.location)?.lat?? 20.2,
                    longitude: JSON.parse(user.photoURL?? user.location)?.lng?? 14.3,
                    latitudeDelta: 0.51,
                    longitudeDelta: 0.51,
                }}
            >
                {
                    Object.keys(mapCards).map(item => {
                        if(mapCards[item].location && item !== user.phoneNumber)
                            return (
                                <Marker
                                    key={item+'marker'}
                                    coordinate={{
                                        latitude: parseFloat(mapCards[item].location.lat),
                                        longitude: parseFloat(mapCards[item].location.lng),
                                    }}
                                    title={'Ima, a ti ne: ' + Object.keys(mapCards[item].cards).length.toString()}
                                    description={item}
                                    onCalloutPress={() => onCalloutPress(item)}
                                >
                                    {renderMarker(Object.keys(mapCards[item].cards).length.toString())}
                                </Marker>
                            )
                    })
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
