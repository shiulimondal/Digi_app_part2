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
        <View style={{alignItems:'center',width:moderateScale(110)}}>
        <Pressable onPress={() => NavigationService.navigate('SubCategoryScreen', { cat_id: item.id, cat_name: item.name })}
            style={{ alignItems: 'center' }}>
            <View key={index} style={{...styles.container,
                backgroundColor:item.boxBg
            }}>
                {
                    item.icon_path === null?
                    <Image source={require('../../assets/images/blankimg.png')} style={styles.img_sty} />
                    :
                    <Image source={{ uri: item.icon_path }} style={styles.img_sty} />
                }
                
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={styles.title_txt}>{item.name}</Text>
            </View>
        </Pressable>
        </View>
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
        borderTopLeftRadius: moderateScale(15),
        borderBottomLeftRadius: moderateScale(15),
        borderBottomRightRadius: moderateScale(15),
        width:moderateScale(100),
    },
    img_sty: {
        height: moderateScale(48),
        width: moderateScale(48),
        resizeMode: 'contain',
    },
    title_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(12),
        width: moderateScale(70),
        textAlign: 'center',
        marginTop: moderateScale(7),
        color: Colors.black,
    }
});

//make this component available to the app
export default CategoryCard;
