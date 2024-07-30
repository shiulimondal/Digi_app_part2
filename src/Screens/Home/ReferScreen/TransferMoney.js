import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { AppTextInput, Icon, RadioButton } from 'react-native-basic-elements';
import numberToWords from 'number-to-words';
import { useFocusEffect } from '@react-navigation/native';
import HomeService from '../../../Services/HomeServises';
import NavigationService from '../../../Services/Navigation';
import Toast from "react-native-simple-toast";
import AllBottonComponent from '../../../Components/BottomComponent/AllBottonComponent';

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
        console.log("delidddddddddddddddddddddddd", data);
        HomeService.deleteBankAcc(data)
            .then((res) => {
                console.log("Responsedataaaaaa:===============", res);
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
                            <View key={index} style={styles.bank_list}>
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
                                    <Text style={{ ...styles.accountholder_txt, marginTop: moderateScale(5) }}>{item.account_no}</Text>
                                    <Text style={{ ...styles.accountholder_txt, marginTop: moderateScale(5) }}>{item.bank_name}</Text>
                                    <View style={{ ...styles.secondart_view, marginTop: moderateScale(7) }}>
                                        <Text style={styles.accountholder_txt}>{item.ifsc_code}</Text>
                                        <Pressable
                                            onPress={() => setDelBankAcc(item.id)}
                                            style={{ ...styles.add_icon_circle, backgroundColor: '#FF3434' }}>
                                            <Image source={require('../../../assets/images/bankdelete.png')}
                                                style={{ height: moderateScale(14), width: moderateScale(14) }} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
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
                <Pressable style={styles.submitButton} onPress={() => {/* Handle the submission */}}>
                    <Text style={styles.submitButtonText}>Confirm Transfer</Text>
                </Pressable>
            )}
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
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
        padding: moderateScale(7)
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
});

export default TransferMoney;
