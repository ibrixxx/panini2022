import {useUser} from "../context/Context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";

const Main = () => {
    const user = useUser()

    return user? <AppNavigation /> : <AuthNavigation />
}

export default Main

