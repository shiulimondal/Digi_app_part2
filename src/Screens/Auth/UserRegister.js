
//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../Constants/Colors';
import Header from '../../Components/Header/Header';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { AppButton, AppTextInput, CheckBox, Icon } from 'react-native-basic-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import AuthService from '../../Services/Auth';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from "react-native-simple-toast";
import { setuser } from '../../Redux/reducer/User';
import NavigationService from '../../Services/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component
const UserRegister = ({ navigation }) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const MobileNumber = route.params.PhNumber;
    console.log('regphone======', MobileNumber);
    const [passwordShow, setPasswordShow] = useState(true);
    const [reConfirmPasswordShow, setReConfirmPasswordShow] = useState(true);
    const [check, setCheck] = useState(false);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);


    const getRegister = async () => {
        if (userName === '') {
            Toast.show('Please enter name');
            return false;
        }
        if (password == '') {
            Toast.show('Please enter password');
        } else if (password.length < 6) {
            Toast.show('Password must be at least 6 characters');
        }

        if (cnfPassword == '') {
            Toast.show('Please enter Confirm password');
        } else if (cnfPassword !== password) {
            Toast.show('Passwords do not match');
        }
        if (!check) {
            Toast.show('Please Click Check Box', Toast.SHORT);
            return
        }

        let data = {
            "name": userName,
            "phone": MobileNumber.phone,
            "password": password,
            "password_confirmation": cnfPassword
        };
        console.log("Responsedataaaaaa:==========", data);
        setBtnLoader(true);
        AuthService.register(data)
            .then((res) => {
                console.log("Response:==========000000000000", JSON.stringify(res));
                setBtnLoader(false);
                if (res.status === true) {
                    AuthService.setAccount(res.data);
                    AuthService.setToken(res?.token);
                    dispatch(setuser(res.data))
                    // NavigationService.navigate('Home')
                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                Toast.show("Error sending OTP", Toast.SHORT, Toast.BOTTOM);
                setBtnLoader(false);
            });
    };



// const getRegister = async () => {
//     if (userName === '') {
//         Toast.show('Please enter name');
//         return false;
//     }
//     if (password === '') {
//         Toast.show('Please enter password');
//     } else if (password.length < 6) {
//         Toast.show('Password must be at least 6 characters');
//     }

//     if (cnfPassword === '') {
//         Toast.show('Please enter Confirm password');
//     } else if (cnfPassword !== password) {
//         Toast.show('Passwords do not match');
//     }
//     if (!check) {
//         Toast.show('Please Click Check Box', Toast.SHORT);
//         return;
//     }

//     let data = {
//         name: userName,
//         phone: MobileNumber.phone,
//         password: password,
//         password_confirmation: cnfPassword
//     };
//     console.log("Responsedataaaaaa:==========", data);
//     setBtnLoader(true);
//     try {
//         const res = await AuthService.register(data);
//         console.log("Response:==========000000000000", JSON.stringify(res));
//         setBtnLoader(false);
//         if (res.status === true) {
//             await AsyncStorage.setItem('userData', JSON.stringify(res.data));
//             await AsyncStorage.setItem('token', res.token);
//             NavigationService.navigate('BottomTab');
//         } else {
//             Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         Toast.show("Error sending OTP", Toast.SHORT, Toast.BOTTOM);
//         setBtnLoader(false);
//     }
// };


    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.top_view}>
                <Text style={styles.top_text}>REGISTER & LOGIN TO YOUR ACCOUNT</Text>
            </View>
            <ScrollView>
                <Text style={{ ...styles.top_text, color: Colors.black, textAlign: 'center', marginTop: moderateScale(18) }}>Create your account</Text>
                <Text style={styles.input_title_txt}>Full Name</Text>
                <AppTextInput
                    placeholder='Full Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}

                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    value={userName}
                    onChangeText={(val) => setUserName(val)}

                />

                <Text style={styles.input_title_txt}>Create Passward</Text>
                <AppTextInput
                    placeholder='Create Passward'
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

                <Text style={styles.input_title_txt}>Re-enter passward</Text>
                <AppTextInput
                    placeholder='Re-enter passward'
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
                    value={cnfPassword}
                    onChangeText={(val) => setCnfPassword(val)}
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

                <View style={{ marginHorizontal: moderateScale(20), marginTop: moderateScale(20), alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        onPress={() => getRegister()}
                        style={styles.reg_button}>
                        {
                            btnLoader ?
                                <ActivityIndicator size={'small'} color={'#fff'} />
                                :
                                <Text style={styles.button_reg_txt}>REGISTER</Text>
                        }

                    </TouchableOpacity>
                </View>
            </ScrollView>



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
    policy_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(13),
        marginLeft: moderateScale(10),
        color: Colors.black
    },
    reg_button: {
        height: moderateScale(40),
        width: moderateScale(90),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(20)
    },
    button_reg_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        color: Colors.secondaryFont
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: (10),
        padding: (20),
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

//make this component available to the app
export default UserRegister;

