//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Modal, ImageBackground } from 'react-native';
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
            { sub_name: item.name, catId: item.category_id, subId: item.id })}
            key={index} style={styles.container}>
            <View>
                <ImageBackground
                    source={require('../../assets/images/sub1_cleanup.png')}
                    style={{
                        height: moderateScale(110),
                        width: moderateScale(119),
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}
                    resizeMode='contain'
                >
                    {
                        item.image_path === null ?
                        <Image source={require('../../assets/images/blankimg.png')} style={styles.blankimg_sty} />
                        :
                        <Image source={{ uri: item.image_path }} style={styles.img_sty} />
                    }
                 
                </ImageBackground>
            </View>
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
        marginBottom: moderateScale(10),
        height: moderateScale(175)
    },
    img_sty: {
        height: moderateScale(72),
        width: moderateScale(80),
        resizeMode: 'cover',
        borderRadius:moderateScale(45)
    },
    blankimg_sty:{
        height:moderateScale(55),
        width:moderateScale(55)
    },
    title_txt: {
        color: Colors.black,
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.medium,
        marginTop: moderateScale(10),
        textAlign: 'center'
    }
});

//make this component available to the app
export default SubCategoryCard;
