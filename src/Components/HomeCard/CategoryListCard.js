//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { Image } from 'react-native';
import { FONTS } from '../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';


// create a component
const CategoryListCard = ({ item, index }) => {
    return (
        <Pressable  onPress={() => NavigationService.navigate('SubCategoryScreen', { cat_id: item.id,cat_name: item.name })} 
         index={index} style={styles.container}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={styles.img_circle}>
                <Image source={{ uri: item.image_path }} style={styles.img_sty} />
            </View>
            <Text numberOfLines={1} style={styles.title_txt}>{item.name}</Text>
            </View>
            <Icon  name='right' type='AntDesign' size={22}/>
           
        </Pressable>
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
        justifyContent:'space-between'
    },
    img_circle: {
        borderWidth: 1,
        padding: moderateScale(10),
        borderRadius: moderateScale(30),
        borderColor:Colors.buttonColor
    },
    img_sty: {
        height: moderateScale(30),
        width: moderateScale(32),
    },
    title_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        textAlign: 'center',
        color: Colors.black,
        marginLeft:moderateScale(10),
        maxWidth:'79%'
    }
});

//make this component available to the app
export default CategoryListCard;
