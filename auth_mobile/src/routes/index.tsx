import React from 'react';
import Stack from './Stack.routes';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../colors';

const Routes = () => {
    return (
        <NavigationContainer theme={{
            dark: false,
            colors: {
                primary: colors.white,
                background: colors.white,
                card: colors.white,
                text: colors.black,
                border: colors.black,
                notification: colors.white,
            },
        }}>
            <Stack />
        </NavigationContainer>
    );
};

export default Routes;
