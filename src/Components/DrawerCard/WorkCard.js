//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';

const { height, width } = Dimensions.get('screen')
// create a component
const WorkCard = ({ item, index }) => {
    return (
        <View key={index} style={styles.container}>
            <Text style={styles.heading_txt}>{index + 1}.<Text>{' '}Hare is you video heading</Text></Text>
            <ImageBackground source={item.cat_logo} style={styles.img_sty}>
                <View style={styles.img_view}>
                <Image source={require('../../assets/images/youtube.png')} style={styles.youtube_img_sty} />
                </View>
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(7),
        marginHorizontal: moderateScale(15),
        marginBottom:moderateScale(20)
    },
    img_sty: {
        height: moderateScale(200),
        width: width - moderateScale(30),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop:moderateScale(10)
    },
    youtube_img_sty:{
        height:moderateScale(45),
        width:moderateScale(60),
        alignSelf:'center',
        resizeMode:'contain'
    },
    img_view:{
        height: moderateScale(200),
        width: width - moderateScale(30),
        alignItems:'center',
        justifyContent:'center'
    },
    heading_txt:{
        fontFamily:FONTS.semibold,
        fontSize:moderateScale(15),
        color:Colors.black
    }
});

//make this component available to the app
export default WorkCard;
