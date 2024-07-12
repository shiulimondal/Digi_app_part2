//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';

// create a component
const UserDataCard = ({item,index}) => {
    return (
        <View key={index}>
            <View style={styles.container}>
                <Image source={item.img} style={styles.logo_sty}/>
                <Text style={styles.title_txt}>{item.title}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#5230DC",
        elevation: moderateScale(2),
        marginRight: moderateScale(10),
        borderRadius: moderateScale(15),
        marginTop:moderateScale(10),
        width:moderateScale(140),
        height:moderateScale(100)

    },
    logo_sty:{
        height:moderateScale(40),
        width:moderateScale(40)
    },
    title_txt:{
        fontFamily:FONTS.semibold,
        fontSize:moderateScale(13),
        marginTop:moderateScale(7),
        color:Colors.secondaryFont
    }
});

//make this component available to the app
export default UserDataCard;
