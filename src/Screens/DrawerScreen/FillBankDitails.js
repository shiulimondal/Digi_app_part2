//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { AppButton, AppTextInput, Icon } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import HomeService from '../../Services/HomeServises';
import Toast from "react-native-simple-toast";
import { useRoute } from '@react-navigation/native';

// create a component
const FillBankDitails = () => {
    const [accountList, setAccountList] = useState();
    const [accountHolderName, setAccountHolderName] = useState()
    const [bankName, setbankName] = useState()
    const [branchName, setbranchName] = useState()
    const [accountNumber, setaccountNumber] = useState()
    const [ifsc, setifsc] = useState()
    const [btnLoader, setBtnLoader] = useState(false);

    const setBankAcc = async () => {
        let data = {
            "account_holder_name": accountHolderName,
            "bank_name": bankName,
            "branch_name": branchName,
            "account_no": accountNumber,
            "ifsc_code": ifsc
        };
        console.log("Responsedataaaaaa:==========++++++++++++++++++++++++++++", data);
        setBtnLoader(true);
        HomeService.addBankAcc(data)
            .then((res) => {
                setBtnLoader(false);
                console.log("Responsedataaaaaa:===============", res);
                if (res.status === true) {
                    NavigationService.navigate('MyBankAccount')
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                    console.log('logggggggggggggggggggg');
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
            <HomeHeader />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Bank Account</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <Text style={styles.input_title_txt}>Account  Holder Name</Text>
                <AppTextInput
                    placeholder='Account  Holder Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                        height: moderateScale(45)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(3)
                    }}
                    value={accountHolderName}
                    onChangeText={(val) => setAccountHolderName(val)}
                />

                <Text style={styles.input_title_txt}>Bank Name</Text>
                <AppTextInput
                    placeholder='Bank Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                        height: moderateScale(45)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(3)
                    }}
                    value={bankName}
                    onChangeText={(val) => setbankName(val)}
                />

                <Text style={styles.input_title_txt}>Branch Name</Text>
                <AppTextInput
                    placeholder='Branch Name'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                        height: moderateScale(45)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(3)
                    }}
                    value={branchName}
                    onChangeText={(val) => setbranchName(val)}
                />

                <Text style={styles.input_title_txt}>Account Number</Text>
                <AppTextInput
                    placeholder='Account Number'
                    keyboardType='numeric'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                        height: moderateScale(45)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(3)
                    }}
                    value={accountNumber}
                    onChangeText={(val) => setaccountNumber(val)}
                />


                <Text style={styles.input_title_txt}>IFSC Code</Text>
                <AppTextInput
                    keyboardType='visible-password'
                    placeholder='IFSC Code'
                    inputContainerStyle={{
                        marginHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        paddingHorizontal: moderateScale(7),
                        height: moderateScale(45)
                    }}
                    mainContainerStyle={{
                        marginTop: moderateScale(3)
                    }}
                    value={ifsc}
                    onChangeText={(val) => setifsc(val)}
                />

                <AppButton
                    title="Add Now"
                    style={styles.button}
                    textStyle={styles.button_txt}
                    onPress={() => setBankAcc()}
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
    input_title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(13),
        marginTop: moderateScale(20),
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
export default FillBankDitails;
