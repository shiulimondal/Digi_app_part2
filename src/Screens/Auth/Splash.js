import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from '../../Constants/PixelRatio';
import { StatusBar } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';
import AuthService from '../../Services/Auth';
import { setuser } from '../../Redux/reducer/User';
import { Colors } from '../../Constants/Colors';

const { width } = Dimensions.get('screen');

const Splash = () => {
    const { login_status, userData } = useSelector(state => state.User);
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState('');

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        if (login_status !== undefined) {
            setTimeout(() => {
                if (userData && login_status) {
                    NavigationService.navigate('DrawerNavigation');
                } else {
                    NavigationService.navigate('OldLogin');
                }
            }, 3000);
        }
    }, [login_status, userData]);

    const checkUser = async () => {
        try {
            const result = await AuthService.getAccount();
            setActiveUser(result);
            if (result) {
                dispatch(setuser(result));
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.buttonColor}
                barStyle='light-content'
            />
            <View>
                <Image source={require('../../assets/images/digilogo.png')} style={styles.splash_img} />
            </View>
            <View style={styles.bottomContainer}>
                <Image source={require('../../assets/images/bottomlogo.png')} style={styles.bottomsplash_img} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.buttonColor
    },
    splash_img: {
        height: moderateScale(160),
        width: moderateScale(290),
    },
    bottomsplash_img: {
        height: moderateScale(180),
        width: width,
        resizeMode: 'contain'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: moderateScale(-14),
    }
});

export default Splash;
