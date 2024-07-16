//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../../Components/Header/Header';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { FONTS } from '../../Constants/Fonts';
import { AppButton } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Services/Navigation';

// create a component
const { height, width } = Dimensions.get('screen')
const MyAccount = () => {
    return (
        <View style={styles.container}>
            <Header />
            <KeyboardAwareScrollView>
            <Text style={styles.title_txt}>Add Your Business Profile</Text>
            <Image source={require('../../assets/images/myacc.png')} style={styles.img_sty} />
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
                onPress={()=>NavigationService.navigate('Home')}
                title="Go Back"
                style={{...styles.button,backgroundColor:Colors.buttonColor,
                    width:width- moderateScale(30),marginTop:moderateScale(15)}}
                textStyle={styles.button_txt}
            />
            </KeyboardAwareScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title_txt: {
        textAlign: 'center',
        marginTop: moderateScale(15),
        color: Colors.buttonColor,
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.buttonColor,
        fontFamily: 'jomhuria'
    },
    img_sty: {
        height: moderateScale(220),
        width: moderateScale(220),
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
        fontFamily: FONTS.medium,
        fontSize: responsiveFontSize(2.1)
    },
    bottom_txt: {
        marginHorizontal: moderateScale(20),
        fontFamily: FONTS.medium,
        fontSize: moderateScale(17),
        color: '#B25EF3',
        marginBottom: moderateScale(15)
    }
});

//make this component available to the app
export default MyAccount;
