import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlbumScreen from "../screens/AlbumScreen";
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

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
                component={AlbumScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="sticker-check-outline" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="map-search-outline" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({color}) => <FontAwesome5 name="user-circle" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigation

