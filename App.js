import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import {RecoilRoot} from "recoil";
import {useEffect, useState} from "react";
import AuthNavigation from "./navigation/AuthNavigation";
import firebase from "firebase/compat";

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
      console.log(firebase.auth())
  }, [])

  return (
    <RecoilRoot>
        <NavigationContainer>
            {
                user? <AppNavigation /> : <AuthNavigation />
            }
            <StatusBar style="light" />
        </NavigationContainer>
    </RecoilRoot>
  );
}
