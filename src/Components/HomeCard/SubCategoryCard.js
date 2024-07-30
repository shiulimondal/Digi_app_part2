//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { TouchableOpacity } from 'react-native';
import NavigationService from '../../Services/Navigation';

// create a component
const SubCategoryCard = ({ item, index }) => {
    console.log('cyajgbkjnhllllllllllllllll', item);
    return (
        <TouchableOpacity onPress={() => NavigationService.navigate('ViewSubcategory',
            { sub_name: item.name, catId: item.category_id, subId:item.id })}
            key={index} style={styles.container}>
            <Image source={{ uri: item.image_path }} style={styles.img_sty} />
            <Text numberOfLines={2} style={styles.title_txt}>{item.name}</Text>

        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.cardColor,
        elevation: moderateScale(4),
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        padding: moderateScale(10),
        width: moderateScale(155),
        borderRadius: moderateScale(12),
        marginBottom:moderateScale(10),
        height:moderateScale(160)
    },
    img_sty: {
        height: moderateScale(92),
        width: moderateScale(100),
        resizeMode: 'contain',
    },
    title_txt: {
        color: Colors.black,
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.medium,
        marginTop: moderateScale(10),
        textAlign:'center'
    }
});

//make this component available to the app
export default SubCategoryCard;
