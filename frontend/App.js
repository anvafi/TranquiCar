import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from './context/Context';

import Screen1 from './screens/screen1/Login';
import Screen2 from './screens/screen2/Register';
import Home from './screens/screen3/Home';
import Reminder from './screens/screen5/Reminder';
import Maintenance from './screens/screen6/Maintenance';
import Vehicle from './screens/screen4/AddVehicle';
import MyVehicle from './screens/screen4/MyVehicle';
import AddReminder from './screens/screen5/AddReminder';
import AddMaintenance from './screens/screen6/AddMaintenance';
// import ForgotPassword from './screens/screen2/ForgotPass';
// import EditReminder from './screens/screen5/EditReminder';
import EditMaintenance from './screens/screen6/EditMaintenance';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MenuLateral = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reminder" component={Reminder} />
        <Tab.Screen name="Maintenance" component={Maintenance} />
    </Tab.Navigator>
);

export default function App() {
    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Log In" component={Screen1} />
                    <Stack.Screen name="Register" component={Screen2} />
                    <Stack.Screen name="Home" component={MenuLateral} />
                    <Stack.Screen name="AddVehicle" component={Vehicle} />
                    <Stack.Screen name="MyVehicle" component={MyVehicle} />
                    <Stack.Screen name="AddReminder" component={AddReminder} />
                    <Stack.Screen name="Reminder" component={Reminder} />
                    <Stack.Screen name="AddMaintenance" component={AddMaintenance} />
                    <Stack.Screen name="Maintenance" component={Maintenance} />
                    <Stack.Screen name="EditMaintenance" component={EditMaintenance} />
                    {/* <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                    <Stack.Screen name="EditReminder" component={EditReminder} /> */}
                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
    );
}


