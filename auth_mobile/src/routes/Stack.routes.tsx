import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../colors';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import Thanks from '../screens/Thanks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Thanks' component={Thanks} />
        </Stack.Navigator>
    );
};

export default StackRoutes;
