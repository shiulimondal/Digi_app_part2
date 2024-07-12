//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

// create a component
const CategoryCard = ({ item, index }) => {
    return (
        <Pressable onPress={()=>NavigationService.navigate('SubCategoryScreen')} style={{ alignItems: 'center' }}>
            <View key={index} style={styles.container}>
                <Image source={item.cat_logo} style={styles.img_sty} />
            </View>
            <Text numberOfLines={1} style={styles.title_txt}>{item.title}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: moderateScale(28),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#efe9f5",
        elevation: moderateScale(2),
        marginRight: moderateScale(10),
        borderTopLeftRadius: moderateScale(15),
        borderBottomLeftRadius: moderateScale(15),
        borderBottomRightRadius: moderateScale(15),
    },
    img_sty: {
        height: moderateScale(30),
        width: moderateScale(32),
        resizeMode:'contain',
        // tintColor:'red'
    },
    title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(12),
        maxWidth: '70%',
        textAlign: 'center',
        marginTop: moderateScale(7),
        color: Colors.black
    }
});

//make this component available to the app
export default CategoryCard;
