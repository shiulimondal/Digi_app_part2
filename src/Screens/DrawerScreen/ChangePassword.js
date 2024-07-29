//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Icon, AppTextInput, AppButton } from 'react-native-basic-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import ScreenHeader from '../../Components/Header/ScreenHeader';
import HomeService from '../../Services/HomeServises';
import NavigationService from '../../Services/Navigation';
import Toast from "react-native-simple-toast";

// create a component
const ChangePassword = ({ navigation }) => {
    const [passwordShow, setPasswordShow] = useState(true);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [reConfirmPasswordShow, setReConfirmPasswordShow] = useState(true);
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [REcnfPassword, setRECnfPassword] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);

    const getChangepassword = async () => {

        if (password == '') {
            Toast.show('Please enter Old password');
        }
        if (cnfPassword == '') {
            Toast.show('Please enter New password');
        } else if (cnfPassword.length < 6) {
            Toast.show('Password must be at least 6 characters');
        }
        if (REcnfPassword == '') {
            Toast.show('Please re-type new password');
        } else if (REcnfPassword !== cnfPassword) {
            Toast.show('Passwords do not match');
        }
        setBtnLoader(false)
        let data = {
            "old_password": password,
            "password": cnfPassword,
            "password_confirmation": REcnfPassword
        }

        setBtnLoader(true)
        HomeService.setChangePassword(data)
            .then((res) => {
                if (res && res.success === true) {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                    setBtnLoader(false)
                    NavigationService.navigate('BottomTab')
                }
                else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                setBtnLoader(false)
            })
    };


    return (
        <View style={styles.container}>
            <ScreenHeader />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Change Password</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.old_password_txt}>Old Password</Text>
                <AppTextInput
                    // placeholder='Old Password'
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
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />

                <Text style={styles.old_password_txt}>New Password</Text>
                <AppTextInput
                    // placeholder='New Password'
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
                    value={cnfPassword}
                    onChangeText={(val) => setCnfPassword(val)}
                />

                <Text style={styles.old_password_txt}>Re-type new password</Text>
                <AppTextInput
                    // placeholder='Re enter New Password'
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
                    value={REcnfPassword}
                    onChangeText={(val) => setRECnfPassword(val)}

                />


                <AppButton
                    title="Change Password"
                    style={styles.button}
                    textStyle={styles.button_txt}
                    // onPress={() => { NavigationService.navigate('BottomTab')}}
                    onPress={() => getChangepassword()}
                    loader={
                        btnLoader
                            ? {
                                position: "right",
                                color: "#fff",
                                size: "small",
                            }
                            : null
                    }
                    disabled={btnLoader}
                />
            </ScrollView>
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
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    old_password_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
        color: Colors.black
    },
    button: {
        height: responsiveWidth(13),
        backgroundColor: Colors.buttonColor,
        marginTop: responsiveWidth(15),
        marginBottom: responsiveWidth(6),
    },
    button_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    }
});

//make this component available to the app
export default ChangePassword;
