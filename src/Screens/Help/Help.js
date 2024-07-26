//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Icon, AppTextInput, AppButton } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import HomeService from '../../Services/HomeServises';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import NavigationService from '../../Services/Navigation';


// create a component
const Help = ({ navigation }) => {
    const { userData } = useSelector(state => state.User)
    const [details, setDetails] = useState('')
    const [useName, setuseName] = useState(userData.full_name);
    const [mobileno, setmobileno] = useState(userData.phone);
    const [btnLoader, setBtnLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const getHelp = async () => {
        let data = {
            "question": details,
            "name": useName,
            "phone": mobileno,
        };
        setBtnLoader(true);
        HomeService.setAboutUs(data)
            .then((res) => {
                setBtnLoader(false);
                if (res.status === true) {
                    console.log('ressssssssssssssssssss', res.data);
                    setModalVisible(true)
                    // Toast.show('Your Quarry Submmit Successfully', Toast.SHORT, Toast.BOTTOM);

                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                    console.error("Error===jhgkjhlkhjlkjn==========00000000000000000000000000:", res.message);
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
            <HomeHeader  />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                        <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Help Center</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.message_view}>
                    <Text style={styles.total_message_txt}>If you have any problems or queries, you can send us a message for a solution. You will definitely receive a reply in your message box as soon as possible</Text>
                </View>

                <Text style={styles.input_title_txt}>Your Name</Text>
                <AppTextInput
                    editable={false}
                    placeholder='Your Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    value={useName}
                    onChangeText={(val) => setuseName(val)}
                />
                <Text style={styles.input_title_txt}>Your Mobile Number</Text>
                <AppTextInput
                    editable={false}
                    placeholder='Your Mobile Number'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    value={mobileno}
                    onChangeText={(val) => setmobileno(val)}
                />
                <Text style={styles.input_title_txt}>Your message</Text>
                <AppTextInput
                    numberOfLines={6}
                    placeholder='Your message'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(5)
                    }}
                    textAlignVertical="top"
                    value={details}
                    onChangeText={(val) => setDetails(val)}
                />


                <AppButton
                    title="Send To Admin"
                    style={styles.button}
                    textStyle={styles.button_txt}
                    onPress={() => { getHelp() }}
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
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Image source={require('../../assets/images/register.png')} style={{ height: 70, width: 70 }} />
                    <Text style={{
                        fontFamily: FONTS.bold,
                        fontSize: moderateScale(16),
                        textAlign: 'center',
                        marginTop: moderateScale(7),
                        color: Colors.buttonColor
                    }}>Your message has been sent successfully</Text>
                    <Text style={styles.modal_massege}> The admin will reply to you as soon as possible, the reply will come in the your message box</Text>

                    <TouchableOpacity
                        onPress={() => { setModalVisible(false)}}
                        style={styles.modalbutton_sty}>
                        <Text style={styles.modalbutton_txt_sty}>Ok</Text>
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
    message_view: {
        backgroundColor: '#266FFD',
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        color: Colors.secondaryFont,
        textAlign: 'left'
    },
    input_title_txt: {
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
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        alignItems: 'center'
    },
    modal_massege: {
        fontFamily: FONTS.Inter.medium,
        fontSize:moderateScale(12),
        color:Colors.black,
        marginTop:moderateScale(10),
        textAlign:'center'
    },
    modalbutton_sty: {
        backgroundColor: Colors.buttonColor,
        borderRadius: moderateScale(20),
        height: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: responsiveWidth(20),
        marginTop: responsiveHeight(4)
    },
    modalbutton_txt_sty: {
        fontFamily: FONTS.Inter.bold,
        fontSize: moderateScale(13),
        alignSelf: 'center',
        color: '#fff'
    },
});

//make this component available to the app
export default Help;
