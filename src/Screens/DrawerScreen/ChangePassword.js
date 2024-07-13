//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Icon, AppTextInput, AppButton } from 'react-native-basic-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

// create a component
const ChangePassword = ({ navigation }) => {
    const [passwordShow, setPasswordShow] = useState(true);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [reConfirmPasswordShow, setReConfirmPasswordShow] = useState(true);
    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation} />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Change Password</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.old_password_txt}>Old Password</Text>
            <AppTextInput
                placeholder='Old Password'
                inputContainerStyle={{
                    marginHorizontal: moderateScale(15),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: moderateScale(7)
                }}
                rightAction={
                    passwordShow ?
                        <Icon
                            name='eye'
                            type='Ionicon'
                        />
                        :
                        <Icon
                            name='eye-off'
                            type='Ionicon'
                        />
                }
                mainContainerStyle={{
                    marginTop: moderateScale(5)
                }}
                onRightIconPress={() => setPasswordShow(!passwordShow)}
                secureTextEntry={passwordShow}
            />

            <Text style={styles.old_password_txt}>New Password</Text>
            <AppTextInput
                placeholder='New Password'
                inputContainerStyle={{
                    marginHorizontal: moderateScale(15),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: moderateScale(7)
                }}
                rightAction={
                    confirmPasswordShow ?
                        <Icon
                            name='eye'
                            type='Ionicon'
                        />
                        :
                        <Icon
                            name='eye-off'
                            type='Ionicon'
                        />
                }
                mainContainerStyle={{
                    marginTop: moderateScale(5)
                }}
                onRightIconPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
                secureTextEntry={confirmPasswordShow}
            />

            <Text  style={styles.old_password_txt}>Re-type new password</Text>
            <AppTextInput
                placeholder='Re enter New Password'
                inputContainerStyle={{
                    marginHorizontal: moderateScale(15),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: moderateScale(7)
                }}
                rightAction={
                    reConfirmPasswordShow ?
                        <Icon
                            name='eye'
                            type='Ionicon'
                        />
                        :
                        <Icon
                            name='eye-off'
                            type='Ionicon'
                        />
                }
                mainContainerStyle={{
                    marginTop: moderateScale(5)
                }}
                onRightIconPress={() => setReConfirmPasswordShow(!reConfirmPasswordShow)}
                secureTextEntry={reConfirmPasswordShow}
            
            />


            <AppButton
                title="Change Password"
                style={styles.button}
                textStyle={styles.button_txt}
                onPress={() => { navigation.navigate('BottomTab') }}
            />

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
    old_password_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
        color:Colors.black
    },
    button: {
        height: responsiveWidth(13),
        backgroundColor: Colors.buttonColor,
        marginTop: responsiveWidth(15),
        marginBottom: responsiveWidth(6),
    },
    button_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.semibold,
        fontSize: responsiveFontSize(2.5)
    }
});

//make this component available to the app
export default ChangePassword;
