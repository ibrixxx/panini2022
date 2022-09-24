import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import Context from "./context/Context";

export default function App() {
  return (
    <Context>
        <NavigationContainer>
            <AppNavigation />
            <StatusBar style="light" />
        </NavigationContainer>
    </Context>
  );
}
