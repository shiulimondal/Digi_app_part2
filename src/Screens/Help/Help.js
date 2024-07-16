//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Icon, AppTextInput, AppButton } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import HomeService from '../../Services/HomeServises';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

// create a component
const Help = ({ navigation }) => {
    const { userData } = useSelector(state => state.User)
    const [details, setDetails] = useState('')
    const [useName, setuseName] = useState(userData.full_name);
    const [mobileno, setmobileno] = useState(userData.phone);
    const [btnLoader, setBtnLoader] = useState(false);
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
                    console.log('ressssssssssssssssssss',res.data);
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);

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
            <HomeHeader navigation={navigation} />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Help Center</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.message_view}>
                    <Text style={styles.total_message_txt}>If you have any problem or
                        queries, you can sendus
                        message for solution. Definitely
                        you will get thereply.</Text>
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
    message_view: {
        backgroundColor: '#2E99E7',
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(25),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(20),
        color: Colors.secondaryFont
    },
    input_title_txt: {
        fontFamily: FONTS.medium,
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
        fontFamily: FONTS.semibold,
        fontSize: responsiveFontSize(2.5)
    }
});

//make this component available to the app
export default Help;
