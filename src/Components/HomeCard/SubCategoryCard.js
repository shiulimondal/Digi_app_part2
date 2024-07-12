//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

// create a component
const SubCategoryCard = ({ item, index }) => {
    return (
        <View key={index} style={styles.container}>
                <Image source={item.cat_logo} style={styles.img_sty} />
                <Text style={styles.title_txt}>{item.title}</Text>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(7),
        backgroundColor: Colors.cardColor,
        elevation: moderateScale(0.3),
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        padding: moderateScale(10),
        width:moderateScale(150),
        borderRadius:moderateScale(12),
    },
    img_sty: {
        height: moderateScale(92),
        width: moderateScale(100),
        resizeMode: 'contain',
    },
    title_txt:{
        color: Colors.black,
        fontSize:moderateScale(14),
        fontFamily:FONTS.medium,
        marginTop:moderateScale(10)
    }
});

//make this component available to the app
export default SubCategoryCard;
