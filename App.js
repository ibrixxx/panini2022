import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import {RecoilRoot} from "recoil";


export default function App() {
  return (
    <RecoilRoot>
        <NavigationContainer>
            <AppNavigation />
            <StatusBar style="light" />
        </NavigationContainer>
    </RecoilRoot>
  );
}
