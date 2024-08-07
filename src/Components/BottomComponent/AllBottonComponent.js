// AllBottonComponent.js
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

const AllBottonComponent = () => {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => NavigationService.navigate('BottomTab', { screen: 'Home' })} style={styles.main_view}>
                <Image
                    source={require('../../assets/images/home.png')}
                    resizeMode='contain'
                    style={styles.img_sty}
                />
                <Text style={styles.title}>HOME</Text>
            </Pressable>

            <Pressable onPress={() => NavigationService.navigate('BottomTab', { screen: 'Message' })} style={styles.main_view}>
                <Image
                    source={require('../../assets/images/message.png')}
                    resizeMode='contain'
                    style={styles.img_sty}
                />
                <Text style={styles.title}>MESSAGE</Text>
            </Pressable>

            <Pressable onPress={() => NavigationService.navigate('BottomTab', { screen: 'MyAccount' })} style={styles.main_view}>
                <Image
                    source={require('../../assets/images/account.png')}
                    resizeMode='contain'
                    style={styles.img_sty}
                />
                <Text style={styles.title}>MY PROFILES</Text>
            </Pressable>

            <Pressable onPress={() => NavigationService.navigate('BottomTab', { screen: 'Help' })} style={styles.main_view}>
                <Image
                    source={require('../../assets/images/help.png')}
                    resizeMode='contain'
                    style={styles.img_sty}
                />
                <Text style={styles.title}>HELP</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(15),
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: moderateScale(20),
    },
    main_view: {
        alignContent: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: moderateScale(9),
        fontFamily: FONTS.Inter.medium,
        marginBottom: moderateScale(7),
        color: '#333333',
        marginTop: moderateScale(5),
    },
    img_sty: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: '#333333',
        alignSelf: 'center',
    },
});

export default AllBottonComponent;
