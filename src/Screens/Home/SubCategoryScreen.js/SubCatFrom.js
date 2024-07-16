//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import HomeHeader from '../../../Components/Header/HomeHeader';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { moderateScale } from '../../../Constants/PixelRatio';
import NavigationService from '../../../Services/Navigation';
import { Icon } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native';

// create a component
const SubCatFrom = () => {
    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.navigate.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Business Account</Text>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginHorizontal: moderateScale(15),
                    marginTop: moderateScale(10),
                    marginBottom: moderateScale(20)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={styles.img_view}>
                            <Image source={require('../../../assets/images/blankimg.png')} style={styles.upload_img} />
                        </View>

                        <TouchableOpacity
                            style={styles.reg_button}>
                            <Text style={styles.button_reg_txt}>Upload Image</Text>

                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    top_view: {
        backgroundColor: Colors.background,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    img_view: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10),
        backgroundColor: Colors.secondaryFont,
        elevation: 2,
        height: moderateScale(95),
        width: moderateScale(95),
        borderRadius: moderateScale(7)
    },
    upload_img: {
        height: moderateScale(60),
        width: moderateScale(60)
    },
    reg_button: {
        height: moderateScale(40),
        width: moderateScale(100),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:moderateScale(20)
    },
    button_reg_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
});

//make this component available to the app
export default SubCatFrom;
