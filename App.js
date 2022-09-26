import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {RecoilRoot} from "recoil";
import Context from "./context/Context";
import Main from "./navigation";

export default function App() {

  return (
    <RecoilRoot>
        <Context>
            <NavigationContainer>
                <Main />
                <StatusBar style="light" />
            </NavigationContainer>
        </Context>
    </RecoilRoot>
  );
}
