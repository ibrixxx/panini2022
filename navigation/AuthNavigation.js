import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from "../screens/AuthScreen";
import AuthConfirmationScreen from "../screens/AuthConfirmationScreen";

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="AuthScreen"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{
                    title: 'Registration',
                }}
            />
            <Stack.Screen
                name="ConfirmationScreen"
                component={AuthConfirmationScreen}
                options={{
                    title: 'Confirmation',
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack
