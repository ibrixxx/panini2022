import {Platform} from "react-native";
import {AdMobBanner} from "expo-ads-admob";

const adUnitId = __DEV__ ? 'ca-app-pub-3940256099942544/2934735716' : Platform.OS === 'ios' ? 'ca-app-pub-7256580607526987/6496253522':'ca-app-pub-7256580607526987/7077819409';

const AddBanner = () => {
    return (
        <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={adUnitId} // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds={false} // true or false
            onDidFailToReceiveAdWithError={e => console.log(e)}
        />
    )
}

export default AddBanner
