//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import BottomTab from './BottomTab';
import DrawerNavigation from './DrawerNavigation';
import Home from '../Screens/Home/Home';


const Stack = createStackNavigator();
// create a component
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='BottomTab'
            screenOptions={{
                headerShown: false,
                // gestureEnabled: true,
                // gestureDirection: 'horizontal',
                // ...TransitionPresets.ModalTransition,
            }}
        >
            <Stack.Screen name="BottomTab" component={DrawerNavigation} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

export default AppStack;
