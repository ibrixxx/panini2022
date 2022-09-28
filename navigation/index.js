import {useUser, useUserUpdate} from "../context/Context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {myCards} from "../atoms/MyCards";

const Main = () => {
    const user = useUser()
    const userUpdate = useUserUpdate()
    const [cards, setCards] = useRecoilState(myCards)

    useEffect(() => {
        (async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                userUpdate(jsonValue != null ? JSON.parse(jsonValue) : null)
            }
            catch(e) {
                console.log(e)
            }
            try {
                const jsonValue = await AsyncStorage.getItem('cards')
                console.log('jsonValue', jsonValue)
                setCards(jsonValue != null ? JSON.parse(jsonValue) : {})
            }
            catch(e) {
                console.log(e)
            }
        })()
    }, [])

    return user? <AppNavigation /> : <AuthNavigation />
}

export default Main

