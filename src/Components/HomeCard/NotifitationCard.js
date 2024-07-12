//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';



// create a component
const NotificationCard = ({ item, index }) => {
    return (
        <View index={index} style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    ...styles.img_circle,
                    backgroundColor: item.circle_bg
                }}>
                    <Text style={styles.user_logo_txt}>{item.user_logo}</Text>

                </View>
                <View style={{marginLeft:moderateScale(10)}}>
                <Text style={styles.title_txt}>{item.title}</Text>
                <Text style={styles.body_txt}>{item.body}</Text>
                </View>
               
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(7),
        backgroundColor: Colors.backgroundColor,
        elevation: moderateScale(0.3),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(15),
        padding: moderateScale(10),
        justifyContent: 'space-between'
    },
    img_circle: {
        borderRadius: moderateScale(30),
        height: moderateScale(45),
        width: moderateScale(45),
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_logo_txt: {
        fontFamily: FONTS.bold,
        fontSize: moderateScale(18),
        color: Colors.secondaryFont
    },
    title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(15),
        color: Colors.black,
    },
    body_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(13),
        color: Colors.grey,
    }
});

//make this component available to the app
export default NotificationCard;

