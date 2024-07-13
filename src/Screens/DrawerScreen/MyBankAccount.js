//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, RefreshControl,ScrollView } from 'react-native';
import HomeService from '../../Services/HomeServises';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, Card, Icon } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';
import { Image } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from "react-native-simple-toast";

// create a component
const MyBankAccount = () => {
    const [accountList, setAccountList] = useState();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fatchBank_list();
    }, [])
    const fatchBank_list = async () => {
        // setLoder(true)
        HomeService.getBankAccList()
            .then((res) => {
                console.log('blockdataaa1111111111111111111111111', res);
                if (res && res.status == true) {
                    setAccountList(res.data)
                    // setLoder(false)
                }
            })
            .catch((err) => {
                // setLoder(false)
            })
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fatchBank_list()

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const setdelBankAcc = async (delID) => {
        let data = {
            "id": delID
        };
        console.log("delidddddddddddddddddddddddd", data);
        HomeService.deleteBankAcc(data)
            .then((res) => {
                console.log("Responsedataaaaaa:===============", res);
                if (res.status === true) {
                    Toast.show('Your BankAccount Detete Successfully');
                } else {
                    Toast.show('Something Wrong, Please Try after Sometime!');
                    console.log('logggggggggggggggggggg==========');
                }
            })
            .catch((err) => {
                console.error("Error================00000000000000000000000000:", err);
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
            {
                accountList && accountList.length === null ?
                    <>
                        <View style={{
                            marginTop: moderateScale(70)
                        }}>
                            <Image style={styles.bank_img} source={require('../../assets/images/bank.png')} />
                        </View>

                        <AppButton
                            title="Add Bank Account"
                            style={styles.button}
                            textStyle={styles.button_txt}
                            onPress={() => { NavigationService.navigate('FillBankDitails') }}
                        />
                    </>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {
                            accountList?.map((item, index) => {
                                return (
                                    <Card key={index} style={{
                                        marginHorizontal: moderateScale(10),
                                        marginTop: moderateScale(20)
                                    }}>
                                        <TouchableOpacity onPress={() => NavigationService.navigate('FillBankDitails')}
                                            style={styles.add_button}>
                                            <Text style={styles.add_txt}>[+] Add New Account</Text>
                                        </TouchableOpacity>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: moderateScale(7)
                                        }}>
                                            <Text style={{
                                                fontFamily: FONTS.semibold,
                                                color: Colors.black,
                                                fontSize: moderateScale(14),
                                            }}>{item.account_holder_name}</Text>
                                            <TouchableOpacity
                                                onPress={() => NavigationService.navigate('EditBankAccount',{bId:item.id})}
                                                style={styles.add_icon_circle}>
                                                <Icon name='pen' size={13} type='FontAwesome5' color={'#fff'} />
                                            </TouchableOpacity>

                                        </View>
                                        <Text style={{
                                            fontFamily: FONTS.medium,
                                            color: Colors.black,
                                            fontSize: moderateScale(14),
                                            marginTop: moderateScale(5)
                                        }}>{item.account_no}</Text>
                                        <Text style={{
                                            fontFamily: FONTS.medium,
                                            color: Colors.black,
                                            fontSize: moderateScale(14),
                                            marginTop: moderateScale(5)
                                        }}>{item.branch_name}</Text>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: moderateScale(7)
                                        }}>
                                            <Text style={{
                                                fontFamily: FONTS.semibold,
                                                color: Colors.black,
                                                fontSize: moderateScale(14),
                                            }}>{item.ifsc_code}</Text>
                                            <Pressable onPress={() => setdelBankAcc(item.id)} style={{ ...styles.add_icon_circle, backgroundColor: '#FF3434' }}>
                                                <Icon name='delete' size={13} type='AntDesign' color={'#fff'} />
                                            </Pressable>

                                        </View>

                                    </Card>
                                )
                            })
                        }
                    </ScrollView>
            }
        </View >
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
    bank_img: {
        height: moderateScale(250),
        width: moderateScale(250),
        tintColor: Colors.cardColor,
        alignSelf: 'center'
    },
    button: {
        height: responsiveWidth(11),
        borderColor: Colors.buttonColor,
        marginTop: responsiveWidth(15),
        marginBottom: responsiveWidth(6),
        borderWidth: 2,
        marginHorizontal: moderateScale(40)
    },
    button_txt: {
        color: Colors.buttonColor,
        fontFamily: FONTS.semibold,
        fontSize: responsiveFontSize(2.5)
    },
    add_button: {
        height: moderateScale(28),
        width: moderateScale(130),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.buttonColor,
        borderRadius: moderateScale(7)
    },
    add_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(10)
    },
    add_icon_circle: {
        height: moderateScale(26),
        width: moderateScale(26),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#194CFF',
        borderRadius: moderateScale(13)
    }
});

//make this component available to the app
export { MyBankAccount };
