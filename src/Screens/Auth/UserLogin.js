//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { AppButton, AppTextInput, CheckBox, Icon } from 'react-native-basic-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import AuthService from '../../Services/Auth';
import { Colors } from '../../Constants/Colors';
import Header from '../../Components/Header/Header';
import { setuser } from '../../Redux/reducer/User';
import { useDispatch } from 'react-redux';
import Toast from "react-native-simple-toast";
import NavigationService from '../../Services/Navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



// create a component
const UserLogin = ({ navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const RegisterData = route.params.PhNumber;
    console.log('getNumber========================================', RegisterData);
    const [mobile, setMobile] = useState(RegisterData?.phone)
    const [password, setPassword] = useState('')
    const [passwordShow, setPasswordShow] = useState(true);
    const [btnLoader, setBtnLoader] = useState(false);
    const [check, setCheck] = useState(false);


    const getUseLogin = async () => {
        if (password == '') {
            Toast.show('Please enter password');
        } else if (password.length < 6) {
            Toast.show('Password must be at least 6 characters');
        }

        if (!check) {
            Toast.show('Please Click Check Box', Toast.SHORT);
            return
        }
        let data = {
            "phone": RegisterData?.phone || mobile,
            "password": password,
            "device_token": ""
        };
        console.log('gogggggggggggggggggggggggggggggg',data);
        setBtnLoader(true);
        AuthService.getLogin(data)
            .then((res) => {
                console.log('logressssssssssssssssssssss', res);
                setBtnLoader(false);
                if (res.status === true) {
                    AuthService.setAccount(res.data);
                    AuthService.setToken(res?.token);
                    dispatch(setuser(res.data))
                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                console.error("Error================00000000000000000000000000:", err);
                Toast.show("Error sending OTP", Toast.SHORT, Toast.BOTTOM);
                setBtnLoader(false);
            });
    };




    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.top_view}>
                <Text style={styles.top_text}>REGISTER & LOGIN TO YOUR ACCOUNT</Text>
            </View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.logtxt}>Login to your account</Text>
                <Text style={styles.input_title_txt}>Mobile Number</Text>
                <AppTextInput
                    placeholder='Enter Mobile Number'
                    keyboardType='numeric'
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
                    onChangeText={() => setMobile(RegisterData?.phone)}
                    rightAction={
                        <TouchableOpacity>
                            {mobile?.length === 10 ? (
                                <Image source={require('../../assets/images/check.png')}
                                    style={{ height: moderateScale(15), width: moderateScale(15) }} />
                            ) : null}
                        </TouchableOpacity>
                    }

                />

                <Text style={styles.input_title_txt}>Password</Text>
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

                <View style={{ flexDirection: 'row', marginTop: moderateScale(20), marginHorizontal: moderateScale(20) }}>
                    <CheckBox
                        checked={check}
                        onChange={(val) => setCheck(val)}
                        size={18}
                        containerStyle={{
                            borderWidth: 1
                        }}
                        activeColor={Colors.buttonColor}
                    />
                    <View>
                        <Text style={styles.policy_txt}>I have read & agree to the <Text style={{ color: '#146CEA' }}>Terms and Conditions</Text></Text>
                        <Text style={styles.policy_txt}>and <Text style={{ color: '#146CEA' }}>Privacy Policy.</Text></Text>
                    </View>

                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
                    <TouchableOpacity
                        onPress={() => getUseLogin()}
                        style={styles.log_button}>
                        {
                            btnLoader ?
                                <ActivityIndicator size={'small'} color={'#fff'} />
                                :
                                <Text style={styles.button_log_txt}>LOGIN</Text>
                        }

                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    onPress={()=>NavigationService.navigate('FPlogin')}
                    >
                    <Text style={styles.forget_pass_txt}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ ...styles.top_text, color: Colors.black, textAlign: 'center', marginTop: moderateScale(30) }}>New User</Text>

                <AppButton
                    title="NEW USER REGISTER NOW"
                    style={styles.button}
                    textStyle={styles.button_txt}
                    onPress={() => { NavigationService.navigate('Login') }}
                />
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    top_view: {
        backgroundColor: Colors.blue,
        padding: moderateScale(7),
        alignItems: 'center',
        justifyContent: 'center'
    },
    top_text: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.secondaryFont,
        fontFamily: 'jomhuria'
    },
    logtxt: {
        color: Colors.black,
        fontSize: moderateScale(22),
        textAlign: 'center',
        marginTop: moderateScale(18),
        fontFamily: FONTS.Inter.bold
    },
    input_title_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        marginTop: moderateScale(25),
        marginHorizontal: moderateScale(15),
        color: Colors.black,
    },
    log_button: {
        height: moderateScale(40),
        width: moderateScale(90),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_log_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        color: Colors.secondaryFont
    },
    forget_pass_txt: {
        color: Colors.blue,
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(15),
        textDecorationLine: 'underline'
    },
    button: {
        height: responsiveWidth(13),
        backgroundColor: Colors.buttonColor,
        marginTop: responsiveWidth(6),
        marginBottom: responsiveWidth(6),
        marginHorizontal: moderateScale(55)
    },
    button_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2)
    },
    policy_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(11),
        marginLeft: moderateScale(10),
        color: Colors.black
    },
});

//make this component available to the app
export default UserLogin;
