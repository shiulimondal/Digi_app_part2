// BottomNavigation_User.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from '../Constants/Colors';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTS } from '../Constants/Fonts';
import Home from '../Screens/Home/Home';
import MyAccount from '../Screens/MyAccount/MyAccount';
import Help from '../Screens/Help/Help';
import { moderateScale } from '../Constants/PixelRatio';
import Message from '../Screens/Message/Message';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-basic-elements';

const Bottom = createBottomTabNavigator();



const BottomTab = () => {
    const navigation = useNavigation();

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
                    tabBarIcon: ({ focused, color, size }) => (
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
                    tabBarIcon: ({ focused, color, size }) => (
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
                    tabBarLabel: 'MY ACCOUNT',
                    tabBarIcon: ({ focused, color, size }) => (
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
                    tabBarIcon: ({ focused, color, size }) => (
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

const styles = StyleSheet.create({
   
});

export default BottomTab;
