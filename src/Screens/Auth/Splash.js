//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Colors } from '../../Constants/Colors';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import { moderateScale } from '../../Constants/PixelRatio';
import { StatusBar } from 'react-native-basic-elements';
import AuthService from '../../Services/Auth';
const { height, width } = Dimensions.get('screen')
// create a component
const Splash = () => {
    const { login_status } = useSelector(state => state.User);

    useEffect(() => {
        if (login_status=== true) {
            setTimeout(() => {
                NavigationService.navigate('DrawerNavigation')
            }, 3000); 
        } else {
            setTimeout(() => {
                NavigationService.navigate('Login')
            }, 3000);
        }

    }, []);
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.buttonColor}
                barStyle='light-content'
            />
            <View>
                <Image source={require('../../assets/images/digilogo.png')} style={styles.splash_img} />
            </View>
            <View style={{position:'absolute',bottom:moderateScale(-14)}}>
                <Image source={require('../../assets/images/bottomlogo.png')} style={styles.bottomsplash_img} />
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.buttonColor
    },
    splash_img: {
        height: moderateScale(100),
        width: moderateScale(180),
    },
    bottomsplash_img:{
        height:moderateScale(180),
        width:width,
        resizeMode:'contain'
    }
});

//make this component available to the app
export default Splash;
