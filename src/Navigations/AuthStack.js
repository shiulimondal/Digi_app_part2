//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import Login from '../Screens/Auth/Login';
import LoginOTP from '../Screens/Auth/LoginOTP';
import UserLogin from '../Screens/Auth/UserLogin';
import UserRegister from '../Screens/Auth/UserRegister';
import DrawerNavigation from './DrawerNavigation';
import BottomTab from './BottomTab';
import Home from '../Screens/Home/Home';
import Message from '../Screens/Message';
import MyAccount from '../Screens/MyAccount/MyAccount';
import Help from '../Screens/Help/Help';

const Stack = createStackNavigator();
// create a component
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginOTP" component={LoginOTP} />
            <Stack.Screen name="UserLogin" component={UserLogin} />
            <Stack.Screen name="UserRegister" component={UserRegister} />

        </Stack.Navigator>
    );
};

export default AuthStack;
