// //import liraries
// import { useRoute } from '@react-navigation/native';
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const ForgetPassword = () => {
//     const route = useRoute()
//     const getPhone = route.params.PhNumber
//     console.log('forgotpageeeeeeeeeeeeeeee',getPhone);
//     return (
//         <View style={styles.container}>
//             <Text>ForgetPassword</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default ForgetPassword;


//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Icon, AppTextInput, AppButton } from 'react-native-basic-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Toast from "react-native-simple-toast";
import AuthService from '../../../Services/Auth';
import NavigationService from '../../../Services/Navigation';
import Header from '../../../Components/Header/Header';
import { useRoute } from '@react-navigation/native';
import { Image } from 'react-native';

// create a component
const ForgetPassword = ({ navigation }) => {
    const route = useRoute()
    const getPhone = route.params.PhNumber
    console.log('forgotpageeeeeeeeeeeeeeee', getPhone);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [reConfirmPasswordShow, setReConfirmPasswordShow] = useState(true);
    const [cnfPassword, setCnfPassword] = useState('')
    const [REcnfPassword, setRECnfPassword] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);
    const [mobile, setMobile] = useState(getPhone?.data)

    const getChangepassword = async () => {

        if (mobile == '') {
            Toast.show('Please enter number');
        }
        if (cnfPassword == '') {
            Toast.show('Please enter New password');
        } else if (cnfPassword.length < 6) {
            Toast.show('Password must be at least 6 characters');
        }
        if (cnfPassword == '') {
            Toast.show('Please re-type new password');
        } else if (REcnfPassword !== cnfPassword) {
            Toast.show('Passwords do not match');
        }
        setBtnLoader(false)
        let data = {
            "phone": mobile,
            "password": cnfPassword,
            "password_confirmation": REcnfPassword
        }
        console.log('555555555555555555',data);
        setBtnLoader(true)
        AuthService.getforgotpassword(data)
            .then((res) => {
                console.log('fogggggggggggggggggggggggggggggaskjflkJFLKJ',res);
                // if (res && res.success === true) {
                //     Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                //     setBtnLoader(false)
                //     NavigationService.navigate('UserLogin')
                // }
                // else {
                //     Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                // }
            })
            .catch((err) => {
                setBtnLoader(false)
            })
    };


    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Set Password</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.old_password_txt}>Mobile</Text>
                <AppTextInput
                    placeholder='Enter Mobile Number'
                    maxLength={10}
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                    }}
                    inputStyle={{ fontFamily: FONTS.medium, fontSize: moderateScale(14) }}
                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    value={mobile}
                    onChangeText={() => setMobile(getPhone?.data)}
                    rightAction={
                        <TouchableOpacity

                        >
                            {mobile > 10 ? (
                                <Image source={require('../../../assets/images/check.png')}
                                    style={{ height: moderateScale(15), width: moderateScale(15) }} />
                            ) : (
                                null
                            )}
                        </TouchableOpacity>
                    }

                />

                <Text style={styles.old_password_txt}>Password</Text>
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

                <Text style={styles.old_password_txt}>Re-type password</Text>
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
        fontFamily: FONTS.Inter.semibold,
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
export default ForgetPassword;

