//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { AppButton, AppTextInput } from 'react-native-basic-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import AuthService from '../../Services/Auth';
import { Colors } from '../../Constants/Colors';
import Header from '../../Components/Header/Header';
import { setuser } from '../../Redux/reducer/User';
import { useDispatch } from 'react-redux';
import Toast from "react-native-simple-toast";


// create a component
const UserLogin = ({ navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const RegisterData = route.params.PhNumber;
    console.log('getNumber=============', RegisterData);
    const [mobile, setMobile] = useState(RegisterData?.phone)
    const [password, setPassword] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);

    const getUseLogin = async () => {
        let data = {
            "phone": RegisterData?.phone,
            "password": password,
            "device_token": ""
        };
        setBtnLoader(true);
        AuthService.getLogin(data)
            .then((res) => {
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
            <Text style={{ ...styles.top_text, color: Colors.black, textAlign: 'center', marginTop: moderateScale(18) }}>Login to your account</Text>
            <Text style={styles.input_title_txt}>Mobile Number</Text>
            <AppTextInput
                placeholder='Enter Mobile Number'
                inputContainerStyle={{
                    marginHorizontal: moderateScale(15),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: moderateScale(7),
                }}

                mainContainerStyle={{
                    marginTop: moderateScale(5)
                }}
                value={mobile}
                onChangeText={() => setMobile(RegisterData.phone)}

            />

            <Text style={styles.input_title_txt}>Password</Text>
            <AppTextInput
                placeholder='Enter Password'
                inputContainerStyle={{
                    marginHorizontal: moderateScale(15),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: moderateScale(7),
                }}

                mainContainerStyle={{
                    marginTop: moderateScale(5)
                }}
                value={password}
                onChangeText={(val) => setPassword(val)}
                keyboardType='visible-password'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
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
                <Text style={styles.forget_pass_txt}>Forgot Password?</Text>
            </View>

            {/* <Text style={{ ...styles.top_text, color: Colors.black, textAlign: 'center', marginTop: moderateScale(30) }}>OR</Text>

            <AppButton
                title="NEW USER REGISTER NOW"
                style={styles.button}
                textStyle={styles.button_txt}
                onPress={() => { navigation.navigate('UserRegister', { SendNumber: MobileNumber }) }}
            /> */}

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
    input_title_txt: {
        fontFamily: FONTS.medium,
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
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        color: Colors.secondaryFont
    },
    forget_pass_txt: {
        color: Colors.blue,
        fontFamily: FONTS.medium,
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
        fontFamily: FONTS.semibold,
        fontSize: responsiveFontSize(2)
    }
});

//make this component available to the app
export default UserLogin;
