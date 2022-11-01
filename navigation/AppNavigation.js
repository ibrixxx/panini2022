import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlbumScreen from "../screens/AlbumScreen";
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import DuplicateCards from "../screens/DuplicateCards";
import GroupScreen from "../screens/GroupScreen";
import MyCardsScreen from "../screens/MyCardsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const AlbumStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="AlbumScreen"
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                animationTypeForReplace: 'pop'
            }}
        >
            <Stack.Screen
                name="AlbumScreen"
                component={AlbumScreen}
            />
            <Stack.Screen
                options={{
                    presentation: 'transparentModal'
                }}
                name="GroupScreen"
                component={GroupScreen}
            />
        </Stack.Navigator>
    )
}


const MapStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="MapView"
            screenOptions={{
                headerShown: false,
                animationEnabled: true
            }}
        >
            <Stack.Screen
                name="MapView"
                component={MapScreen}
            />
            <Stack.Screen
                options={{
                    presentation: 'modal'
                }}
                name="DuplicateCards"
                component={DuplicateCards}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{
                headerShown: false,
                animationEnabled: true
            }}
        >
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                options={{
                    presentation: 'transparentModal'
                }}
                name="Cards"
                component={MyCardsScreen}
            />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
            }}
            initialRouteName={'Album'}>
            <Tab.Screen
                name="Album"
                component={AlbumStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="sticker-check-outline" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="map-search-outline" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <FontAwesome5 name="user-circle" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigation

