import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {useUser} from "../context/Context";
import {useRecoilValue} from "recoil";
import {collectorsData} from "../atoms/MyCards";

export default function MapScreen() {
    const user = useUser()
    const data = useRecoilValue(collectorsData)

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
                    Object.keys(data).map(item => {
                        if(data[item].location)
                            return (
                                <Marker
                                    key={item+'marker'}
                                    coordinate={{
                                        latitude: parseFloat(data[item].location.lat),
                                        longitude: parseFloat(data[item].location.lng),
                                    }}
                                    title={Object.keys(data[item].cards).length.toString()}
                                    description={item}
                                />
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
