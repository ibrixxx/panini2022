import {useUser, useUserUpdate} from "../context/Context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {collectorsData, myCards} from "../atoms/MyCards";
import {getDatabase, onValue, ref} from "firebase/database";

const Main = () => {
    const user = useUser()
    const userUpdate = useUserUpdate()
    const [cards, setCards] = useRecoilState(myCards)
    const [data, setData] = useRecoilState(collectorsData)

    useEffect(() => {
        (async () => {
            let usr = null
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                userUpdate(jsonValue != null ? JSON.parse(jsonValue) : null)
                usr = jsonValue != null ? JSON.parse(jsonValue) : null
            }
            catch(e) {
                console.log(e)
            }
            try {
                const jsonValue = await AsyncStorage.getItem('cards')
                console.log('jsonValue', jsonValue)
                // setCards(jsonValue != null ? JSON.parse(jsonValue) : {})
            }
            catch(e) {
                console.log(e)
            }
            const db = getDatabase();
            const reference = ref(db, 'users');
            await onValue(reference, (snapshot) => {
                const res = snapshot.val();
                console.log("Res: " + JSON.stringify(res));
                setData(res)
                setCards(res[usr?.phoneNumber].cards)
            });
        })()
    }, [])

    return user? <AppNavigation /> : <AuthNavigation />
}

export default Main

