import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { AppButton, AppTextInput, Card, Icon, RadioButton } from 'react-native-basic-elements';
import numberToWords from 'number-to-words';
import { useFocusEffect } from '@react-navigation/native';
import HomeService from '../../../Services/HomeServises';
import NavigationService from '../../../Services/Navigation';
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import AllBottonComponent from '../../../Components/BottomComponent/AllBottonComponent';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const isSafeNumber = (num) => {
    return num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER;
};

const TransferMoney = () => {
    const [transferCash, setTransferCash] = useState('');
    const [amountInWords, setAmountInWords] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountList, setAccountList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState('')
    const [btnLoader, setBtnLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    console.log('selectbankiddddddddddddddddddd', selectedAccount);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        if (transferCash) {
            const number = parseInt(transferCash, 10);
            if (!isNaN(number) && isSafeNumber(number)) {
                try {
                    setAmountInWords(toTitleCase(numberToWords.toWords(number)) + ' only');
                } catch (error) {
                    console.error(error);
                    setAmountInWords('Number is out of range');
                }
            } else {
                setAmountInWords('Invalid number');
            }
        } else {
            setAmountInWords('');
        }
    }, [transferCash]);

    const fetchBankList = async () => {
        setLoading(true);
        HomeService.getBankAccList()
            .then((res) => {
                console.log('blockdataaa1111111111111111111111111', res);
                if (res && res.status === true) {
                    setAccountList(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useFocusEffect(
        useCallback(() => {
            fetchBankList();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchBankList();

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const setDelBankAcc = async (delID) => {
        let data = {
            "id": delID
        };
        HomeService.deleteBankAcc(data)
            .then((res) => {
                if (res.status === true) {
                    Toast.show('Your Bank Account Deleted Successfully');
                    fetchBankList();
                } else {
                    Toast.show('Something went wrong, please try again later!');
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    };

    const getmodalwithdraw = async () => {
        if (transferCash === '') {
            Toast.show('Please enter amount');
            return false
        }
        const data = {
            "amount": transferCash,
            bank_id: selectedAccount
        }
        setAllData(data)
        setModalVisible(true)
    };

    const getwithdraw = (() => {
        setBtnLoader(true)
        HomeService.setwithdraw(allData)
            .then((res) => {
                if (res && res.success === true) {
                    setModalVisible(false)
                    setBtnLoader(false)
                    Toast.show('Withdraw request send to Admin Successfully');
                    NavigationService.navigate('BottomTab')
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                setBtnLoader(false)
            })
    })

    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Transfer Money</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.show_balance}>Balance available: Rs. 3</Text>
            <Text style={styles.max_balance}>Enter Amount (Minimum Rs 150)</Text>
            <AppTextInput
                inputContainerStyle={styles.input_sty}
                mainContainerStyle={{ marginTop: moderateScale(7) }}
                value={transferCash}
                onChangeText={(val) => setTransferCash(val)}
                keyboardType='phone-pad'
                maxLength={6}
            />

            {amountInWords ? (
                <Text numberOfLines={1} style={styles.amount_in_words}>{amountInWords}</Text>
            ) : null}

            {
                accountList?.length >= 2 ?
                    null
                    :
                    <Pressable
                        onPress={() => NavigationService.navigate('TransferFillBank', {
                            onGoBack: () => fetchBankList()
                        })}
                        style={styles.add_button}>
                        <View style={styles.iconcircle}>
                            <Icon name='plus' type='AntDesign' size={17} />
                        </View>
                        <Text style={styles.add_txt}>Add New Account</Text>
                    </Pressable>
            }
            <Text style={styles.select_ammount}>Select Account</Text>

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    accountList?.map((item, index) => {
                        return (
                            <Card key={index} style={styles.bank_list}>
                                <RadioButton
                                    selected={selectedAccount === item.id}
                                    onChange={() => setSelectedAccount(item.id)}
                                    size={20}
                                />
                                <View style={styles.primary_view}>
                                    <View style={styles.secondart_view}>
                                        <Text style={styles.accountholder_txt}>{item.account_holder_name}</Text>
                                        <TouchableOpacity
                                            onPress={() => NavigationService.navigate('TransferEditBank', { bId: item.id })}
                                            style={styles.add_icon_circle}>
                                            <Image source={require('../../../assets/images/bankedit.png')}
                                                style={{ height: moderateScale(14), width: moderateScale(14) }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ ...styles.accountnumber_txt, marginTop: moderateScale(5) }}>{item.account_no}</Text>
                                    <Text style={{ ...styles.accountnumber_txt, marginTop: moderateScale(5) }}>{item.bank_name}</Text>
                                    <View style={{ ...styles.secondart_view, marginTop: moderateScale(5) }}>
                                        <Text style={styles.accountnumber_txt}>{item.ifsc_code}</Text>
                                        <Pressable
                                            onPress={() => setDelBankAcc(item.id)}
                                            style={{ ...styles.add_icon_circle, backgroundColor: '#FF3434' }}>
                                            <Image source={require('../../../assets/images/bankdelete.png')}
                                                style={{ height: moderateScale(14), width: moderateScale(14) }} />
                                        </Pressable>
                                    </View>
                                </View>
                            </Card>
                        )
                    })
                }
            </ScrollView>

            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.buttonColor} />
                </View>
            )}

            {selectedAccount && (
                <Pressable
                    style={styles.submitButton} onPress={() => { getmodalwithdraw() }}>
                    <Text style={styles.submitButtonText}>Confirm Transfer</Text>
                </Pressable>
            )}
            <View style={{ flex: 1 }} />
            <View style={{
                height: moderateScale(60),
                bottom: 0,
                backgroundColor: Colors.background,
                marginTop: moderateScale(10),
                elevation: 4
            }}>
                <AllBottonComponent />
            </View>

            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modal_box_view}>
                        <Text style={styles.modal_massege}>Withdrawal Instructions</Text>

                        <Text style={styles.modal_text}>1: The number of withdrawals is unlimited. The minimum withdrawals amount is 100/- </Text>
                        <Text style={styles.modal_text}>2: IFSC should be 11 characters and 5th character should be 0. If you fill in wrong bank information, your withdrawal will fail.</Text>
                        <Text style={styles.modal_text}>3: Withdrawal fee: 6% Admin maintenance charges.</Text>
                        <Text style={styles.modal_text}>4: Withdrawal time: 1-3 Working days</Text>
                    </View>

                    <AppButton
                        shadow={true}
                        title='Got It'
                        textStyle={styles.modal_button_txt_sty}
                        style={styles.modal_button_sty}
                        onPress={() => { getwithdraw() }}
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
                </View>
            </Modal>
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
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    show_balance: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(15),
        color: Colors.black
    },
    max_balance: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(4),
        color: Colors.black
    },
    input_sty: {
        marginHorizontal: moderateScale(15),
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(7),
        borderColor: Colors.buttonColor,
        height: moderateScale(47)
    },
    amount_in_words: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(13),
        marginHorizontal: moderateScale(17),
        marginTop: moderateScale(13),
        color: Colors.black
    },
    add_button: {
        height: moderateScale(40),
        width: moderateScale(150),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.buttonColor,
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(7)
    },
    iconcircle: {
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryFont
    },
    add_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
    select_ammount: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10),
        color: Colors.black
    },
    bank_list: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(5)
    },
    primary_view: {
        marginLeft: moderateScale(15),
        flex: 1,
        marginTop: moderateScale(-2)
    },
    add_icon_circle: {
        height: moderateScale(26),
        width: moderateScale(26),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#194CFF',
        borderRadius: moderateScale(13)
    },
    secondart_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accountholder_txt: {
        fontFamily: FONTS.Inter.semibold,
        color: Colors.black,
        fontSize: moderateScale(14),
    },
    accountnumber_txt: {
        fontFamily: FONTS.Inter.medium,
        color: Colors.black,
        fontSize: moderateScale(14),
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    submitButton: {
        position: 'absolute',
        bottom: moderateScale(70),
        left: moderateScale(15),
        right: moderateScale(15),
        backgroundColor: Colors.buttonColor,
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(15),
        alignItems: 'center',
    },
    submitButtonText: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.white,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: (10),
        padding: (20),
        // borderWidth: 2,
        alignItems: 'center'
    },
    modal_box_view: {
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: moderateScale(10),
        paddingBottom: moderateScale(15)
    },
    modal_massege: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.black,
        textAlign: 'center'
    },
    modal_text: {
        fontFamily: FONTS.regular,
        fontSize: moderateScale(12),
        color: Colors.modaltxt,
        marginTop: moderateScale(10)
    },
    modal_button_sty: {
        backgroundColor: 'red',
        borderRadius: 20,
        height: moderateScale(35),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: responsiveWidth(28),
        marginTop: responsiveHeight(4)
    },
    modal_button_txt_sty: {
        fontFamily: FONTS.Inter.bold,
        fontSize: moderateScale(15),
        alignSelf: 'center',
        color: '#fff'
    },
});

export default TransferMoney;
