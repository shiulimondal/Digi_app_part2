//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { FONTS } from '../../Constants/Fonts';
import { AppButton } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';
import HomeHeader from '../../Components/Header/HomeHeader';

// create a component
const { height, width } = Dimensions.get('screen')
const MyAccount = () => {
    return (
        <View style={styles.container}>
            <HomeHeader />
            {/* <KeyboardAwareScrollView> */}
                <Text style={styles.title_txt}>Add Your Business Profile</Text>
                <Image source={require('../../assets/images/profilebanner.jpg')} style={styles.img_sty} />
                <AppButton
                    title="Please add your business profile"
                    style={styles.button}
                    textStyle={styles.button_txt}
                />
                <Text style={styles.bottom_txt}>Add your profile sub category wise.</Text>
                <Text style={styles.bottom_txt}>There are different categories in our
                    service.</Text>
                <Text style={styles.bottom_txt}>Search for our subcategories and see
                    wich category you belong to</Text>
                <Text style={styles.bottom_txt}>You will get the option to add your
                    profile there</Text>

                <AppButton
                    onPress={() => NavigationService.navigate('CategoryScreen')}
                    title="Click here to add your profile"
                    style={{
                        ...styles.button, backgroundColor: Colors.buttonColor,
                        width: width - moderateScale(30), marginTop: moderateScale(15)
                    }}
                    buttonIcon = {{
                        position: 'right',
                        name: 'rightcircleo',
                        type: 'AntDesign',
                        color:Colors.secondaryFont
                    }}
                    textStyle={styles.clickbutton_txt}
                />
            {/* </KeyboardAwareScrollView> */}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title_txt: {
        textAlign: 'center',
        marginTop: moderateScale(15),
        color: Colors.buttonColor,
        fontSize: moderateScale(32),
        color: Colors.buttonColor,
        fontFamily: FONTS.Condiment.regular,
    },
    img_sty: {
        height: moderateScale(180),
        width: moderateScale(180),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    button: {
        height: responsiveWidth(13),
        backgroundColor: Colors.blue,
        marginBottom: responsiveWidth(6),
        width: width - moderateScale(70),
        alignSelf: 'center'
    },
    button_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.Almendra.regular,
        fontSize: moderateScale(18)
    },
    clickbutton_txt:{
        color: Colors.secondaryFont,
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(18)
    },
    bottom_txt: {
        marginHorizontal: moderateScale(20),
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: '#B25EF3',
        marginBottom: moderateScale(15)
    }
});

//make this component available to the app
export default MyAccount;
