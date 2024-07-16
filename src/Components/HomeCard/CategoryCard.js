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
        <Pressable onPress={() => NavigationService.navigate('SubCategoryScreen', { cat_id: item.id, cat_name: item.name })}
            style={{ alignItems: 'center' }}>
            <View key={index} style={styles.container}>
                <Image source={{ uri: item.image_path }} style={styles.img_sty} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={styles.title_txt}>{item.name}</Text>
            </View>

        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: moderateScale(20),
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
        height: moderateScale(45),
        width: moderateScale(45),
        resizeMode: 'contain',
        // tintColor:'red'
    },
    title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(12),
        width: moderateScale(70),
        textAlign: 'center',
        marginTop: moderateScale(7),
        color: Colors.black,
    }
});

//make this component available to the app
export default CategoryCard;
