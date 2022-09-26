import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from "../screens/AuthScreen";
import AuthConfirmationScreen from "../screens/AuthConfirmationScreen";

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="AuthScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
            />
            <Stack.Screen
                name="ConfirmationScreen"
                component={AuthConfirmationScreen}
            />
        </Stack.Navigator>
    );
}

export default AuthStack
