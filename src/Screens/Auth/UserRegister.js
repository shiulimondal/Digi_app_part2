
//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors } from '../../Constants/Colors';
import Header from '../../Components/Header/Header';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { AppButton, AppTextInput, CheckBox, Icon } from 'react-native-basic-elements';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRoute } from '@react-navigation/native';
import AuthService from '../../Services/Auth';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from "react-native-simple-toast";
import { setuser } from '../../Redux/reducer/User';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// create a component
const UserRegister = ({ navigation }) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const MobileNumber = route.params.PhNumber;
    const [passwordShow, setPasswordShow] = useState(true);
    const [reConfirmPasswordShow, setReConfirmPasswordShow] = useState(true);
    const [check, setCheck] = useState(false);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const getoprnmodalRegister = async () => {
        if (userName === '') {
            Toast.show('Please enter Full Name');
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
        setModalVisible(true)
        getRegister(data)
    };

    const getRegister = async (data) => {
        AuthService.register(data)
            .then((res) => {
                setModalVisible(true)
                if (res.status === true) {
                    setModalVisible(false)
                    AuthService.setAccount(res.data);
                    AuthService.setToken(res?.token);
                    dispatch(setuser(res.data))
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }



    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.top_view}>
                <Text style={styles.top_text}>REGISTER & LOGIN TO YOUR ACCOUNT</Text>
            </View>
            <KeyboardAwareScrollView>
            <Text style={styles.logtxt}>Create your account</Text>
                <Text style={styles.input_title_txt}>Full Name</Text>
                <AppTextInput
                    // placeholder='Full Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    inputStyle={{ fontFamily: FONTS.medium, fontSize: moderateScale(14) }}
                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    value={userName}
                    onChangeText={(val) => setUserName(val)}

                />

                <Text style={styles.input_title_txt}>Create Password</Text>
                <AppTextInput
                    // placeholder='Create Passward'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    inputStyle={{ fontFamily: FONTS.medium, fontSize: moderateScale(14) }}
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

                <Text style={styles.input_title_txt}>Re-enter password</Text>
                <AppTextInput
                    // placeholder='Re-enter passward'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    inputStyle={{ fontFamily: FONTS.medium, fontSize: moderateScale(14) }}
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
                        onPress={() => getoprnmodalRegister()}
                        style={styles.reg_button}>
                        {
                            btnLoader ?
                                <ActivityIndicator size={'small'} color={'#fff'} />
                                :
                                <Text style={styles.button_reg_txt}>REGISTER</Text>
                        }

                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

            <Modal
                isVisible={isModalVisible}

            >
                <View style={styles.modalView}>
                    <Image source={require('../../assets/images/register.png')} style={{ height: 80, width: 80 }} />
                    <Text style={{
                        fontFamily: FONTS.bold,
                        fontSize: moderateScale(20),
                        textAlign: 'center',
                        marginTop: moderateScale(7),
                        color: Colors.black
                    }}>Congratulations !</Text>
                    <Text style={styles.modal_massege}>Register Successfully </Text>

                    <TouchableOpacity
                        onPress={() => { getRegister() }}
                        style={styles.button_sty}>
                        {
                            btnLoader ?
                                <ActivityIndicator size={'small'} color={'#fff'} />
                                :
                                <Text style={styles.button_txt_sty}>Ok</Text>
                        }

                    </TouchableOpacity>
                </View>
            </Modal>

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
        fontFamily:FONTS.Inter.bold
    },
    input_title_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        marginTop: moderateScale(25),
        marginHorizontal: moderateScale(15),
        color: Colors.black,
    },
    policy_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(11),
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        color: Colors.secondaryFont
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        borderWidth: 2,
        alignItems: 'center'
    },
    modal_massege: {
        fontFamily: FONTS.Inter.regular,
        fontSize: responsiveFontSize(2),
        color: Colors.black,
        marginTop: responsiveHeight(2)
    },
    button_sty: {
        backgroundColor: Colors.buttonColor,
        borderRadius: moderateScale(20),
        height: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: responsiveWidth(20),
        marginTop: responsiveHeight(4)
    },
    button_txt_sty: {
        fontFamily: FONTS.Inter.bold,
        fontSize: moderateScale(13),
        alignSelf: 'center',
        color: '#fff'
    },
});

//make this component available to the app
export default UserRegister;

