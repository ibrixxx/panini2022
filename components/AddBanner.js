import {BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import {BannerAd} from "react-native-google-mobile-ads/src/ads/BannerAd";
import {Platform} from "react-native";

const adUnitId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? 'ca-app-pub-7256580607526987~9502708740':'ca-app-pub-7256580607526987~7423819246';

const AddBanner = () => {
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}

export default AddBanner
