
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AppButton, AppTextInput, Icon } from 'react-native-basic-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from "react-native-simple-toast";
import HomeService from '../../../Services/HomeServises';
import NavigationService from '../../../Services/Navigation';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Colors } from '../../../Constants/Colors';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import AllBottonComponent from '../../../Components/BottomComponent/AllBottonComponent';


// create a component
const TransferFillBank = () => {
    const [accountList, setAccountList] = useState();
    const [accountHolderName, setAccountHolderName] = useState()
    const [bankName, setbankName] = useState()
    // const [branchName, setbranchName] = useState()
    const [accountNumber, setaccountNumber] = useState()
    const [ifsc, setifsc] = useState()
    const [btnLoader, setBtnLoader] = useState(false);

    const setBankAcc = async () => {
        let data = {
            "account_holder_name": accountHolderName,
            "bank_name": bankName,
            "account_no": accountNumber,
            "ifsc_code": ifsc
        };
        setBtnLoader(true);
        HomeService.addBankAcc(data)
            .then((res) => {
                setBtnLoader(false);
                if (res.status === true) {
                    NavigationService.navigate('TransferMoney')
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                console.error("Error================00000000000000000000000000:", err);
                setBtnLoader(false);
            });
    };

    return (
        <View style={styles.container}>
            <ScreenHeader />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
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
            <View style={{flex:1}}/>
              <View style={{
                height: moderateScale(60),
                bottom:0,
                backgroundColor: Colors.background,
                marginTop: moderateScale(10),
                elevation:4
            }}>
                <AllBottonComponent />
            </View>
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
    input_title_txt: {
        fontFamily: FONTS.Inter.medium,
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    }
});

//make this component available to the app
export default TransferFillBank;

