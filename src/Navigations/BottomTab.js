// BottomNavigation_User.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from '../Constants/Colors';
import { Image } from 'react-native';
import { FONTS } from '../Constants/Fonts';
import Home from '../Screens/Home/Home';
import MyAccount from '../Screens/MyAccount/MyAccount';
import Help from '../Screens/Help/Help';
import { moderateScale } from '../Constants/PixelRatio';
import Message from '../Screens/Message/Message';

const Bottom = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.buttonColor,
                tabBarInactiveTintColor: '#333333',
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                    fontFamily: FONTS.Inter.medium,
                    marginBottom: moderateScale(10),
                },
                tabBarStyle: {
                    backgroundColor: Colors.backgroundColor,
                    height: moderateScale(55),
                    paddingBottom: 0,
                },
            }}
        >
            <Bottom.Screen
                name="Home"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'HOME',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/home.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 23 : 20),
                                width: moderateScale(focused ? 23 : 20),
                                tintColor: focused ? Colors.buttonColor : '#333333',
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Message"
                component={Message}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'MESSAGE',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/message.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 23 : 20),
                                width: moderateScale(focused ? 23 : 20),
                                tintColor: focused ? Colors.buttonColor : '#333333',
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'MY PROFILES',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/account.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 23 : 20),
                                width: moderateScale(focused ? 23 : 20),
                                tintColor: focused ? Colors.buttonColor : '#333333',
                            }}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Help"
                component={Help}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'HELP',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/help.png')}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(focused ? 23 : 20),
                                width: moderateScale(focused ? 23 : 20),
                                tintColor: focused ? Colors.buttonColor : '#333333',
                            }}
                        />
                    ),
                }}
            />
        </Bottom.Navigator>
    );
};

export default BottomTab;
