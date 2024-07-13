// Import libraries
import React, { useEffect, useState } from 'react';
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

const EditBankAccount = () => {
    const route = useRoute();
    const AccountId = route.params.bId;
    console.log('Fetched Account ID:', AccountId);

    const [accountHolderName, setAccountHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);

    useEffect(() => {
        fetchBankList();
    }, []);

    const fetchBankList = async () => {
        HomeService.getBankAccList()
            .then((res) => {
                console.log('Fetched Bank List:', res);
                if (res && res.status === true) {
                    const account = res.data.find(acc => acc.id === AccountId);
                    if (account) {
                        setAccountHolderName(account.account_holder_name);
                        setBankName(account.bank_name);
                        setBranchName(account.branch_name);
                        setAccountNumber(account.account_no);
                        setIfsc(account.ifsc_code);
                    }
                }
            })
            .catch((err) => {
                console.error('Error fetching bank list:', err);
            });
    };

    const updateBankAccount = async () => {
        const data = {
            id: AccountId,
            account_holder_name: accountHolderName,
            bank_name: bankName,
            branch_name: branchName,
            account_no: accountNumber,
            ifsc_code: ifsc
        };

        console.log('Update Data:', data);
        setBtnLoader(true);
        HomeService.addBankAcc(data)
            .then((res) => {
                setBtnLoader(false);
                console.log('Update Response:', res);
                if (res.status === true) {
                    NavigationService.navigate('MyBankAccount');
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                } else {
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                console.error('Error updating bank account:', err);
                Toast.show("Error updating bank account", Toast.SHORT, Toast.BOTTOM);
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
                <Text style={styles.input_title_txt}>Account Holder Name</Text>
                <AppTextInput
                    placeholder='Account Holder Name'
                    inputContainerStyle={styles.inputContainer}
                    mainContainerStyle={styles.inputMainContainer}
                    value={accountHolderName}
                    onChangeText={(val) => setAccountHolderName(val)}
                />

                <Text style={styles.input_title_txt}>Bank Name</Text>
                <AppTextInput
                    placeholder='Bank Name'
                    inputContainerStyle={styles.inputContainer}
                    mainContainerStyle={styles.inputMainContainer}
                    value={bankName}
                    onChangeText={(val) => setBankName(val)}
                />

                <Text style={styles.input_title_txt}>Branch Name</Text>
                <AppTextInput
                    placeholder='Branch Name'
                    inputContainerStyle={styles.inputContainer}
                    mainContainerStyle={styles.inputMainContainer}
                    value={branchName}
                    onChangeText={(val) => setBranchName(val)}
                />

                <Text style={styles.input_title_txt}>Account Number</Text>
                <AppTextInput
                    placeholder='Account Number'
                    keyboardType='numeric'
                    inputContainerStyle={styles.inputContainer}
                    mainContainerStyle={styles.inputMainContainer}
                    value={accountNumber}
                    onChangeText={(val) => setAccountNumber(val)}
                />

                <Text style={styles.input_title_txt}>IFSC Code</Text>
                <AppTextInput
                    keyboardType='visible-password'
                    placeholder='IFSC Code'
                    inputContainerStyle={styles.inputContainer}
                    mainContainerStyle={styles.inputMainContainer}
                    value={ifsc}
                    onChangeText={(val) => setIfsc(val)}
                />

                <AppButton
                    title="Update Now"
                    style={styles.button}
                    textStyle={styles.button_txt}
                    onPress={updateBankAccount}
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
    inputContainer: {
        marginHorizontal: moderateScale(15),
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(7),
        height: moderateScale(45)
    },
    inputMainContainer: {
        marginTop: moderateScale(3)
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

export default EditBankAccount;
