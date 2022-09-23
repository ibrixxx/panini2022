import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <NavigationContainer>
        <AppNavigation />
        <StatusBar style="light" />
    </NavigationContainer>
  );
}
