import {Text, View} from "react-native";
import {Caption} from "react-native-paper";
import {scale} from "react-native-size-matters";

const MyCallout = ({phone, message}) => {

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: scale(5), padding: scale(5), width: '100%', backgroundColor: 'white'}}>
            <Text style={{fontWeight: 'bold'}}>{message}</Text>
            <Caption>{phone}</Caption>
        </View>
    )
}

export default MyCallout
