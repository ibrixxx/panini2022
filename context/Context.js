import React, {useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const useUserUpdate = () => {
    return useContext(UserUpdateContext)
}

const Context = ({children}) => {
    const [user, setUser] = useState(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e)
        }
    })


    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default Context;
