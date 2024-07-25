import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import HomeService from '../../Services/HomeServises';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, Card, Icon } from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';
import { Image } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from "react-native-simple-toast";
import ScreenHeader from '../../Components/Header/ScreenHeader';
import { useFocusEffect } from '@react-navigation/native';

// create a component
const MyBankAccount = () => {
    const [accountList, setAccountList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    const fatchBank_list = async () => {
        setLoading(true); // Show loader
        HomeService.getBankAccList()
            .then((res) => {
                console.log('blockdataaa1111111111111111111111111', res);
                if (res && res.status === true) {
                    setAccountList(res.data);
                }
                setLoading(false); // Hide loader
            })
            .catch((err) => {
                setLoading(false); // Hide loader
            });
    };

    useFocusEffect(
        useCallback(() => {
            fatchBank_list();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fatchBank_list();

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
                    Toast.show('Your Bank Account Deleted Successfully');
                    fatchBank_list();
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
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Bank Account</Text>
                    </View>
                </View>
            </View>
            {
                loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={Colors.buttonColor} />
                    </View>
                ) : (
                    accountList && accountList.length === 0 ?
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
                                onPress={() => {
                                    NavigationService.navigate('FillBankDitails', {
                                        onGoBack: () => fatchBank_list()
                                    })
                                }}
                            />
                        </>
                        :
                        <View>
                            {
                                accountList?.length >= 2 ?
                                    null
                                    :
                                    <TouchableOpacity onPress={() => NavigationService.navigate('FillBankDitails', {
                                        onGoBack: () => fatchBank_list()
                                    })}
                                        style={styles.add_button}>
                                        <Text style={styles.add_txt}>[+] Add New Account</Text>
                                    </TouchableOpacity>
                            }



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
                                                marginTop:moderateScale(10),
                                                marginBottom:moderateScale(10)
                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: moderateScale(7)
                                                }}>
                                                    <Text style={{
                                                        fontFamily: FONTS.Inter.semibold,
                                                        color: Colors.black,
                                                        fontSize: moderateScale(14),
                                                    }}>{item.account_holder_name}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => NavigationService.navigate('EditBankAccount', { bId: item.id })}
                                                        style={styles.add_icon_circle}>
                                                        <Icon name='pen' size={13} type='FontAwesome5' color={'#fff'} />
                                                    </TouchableOpacity>

                                                </View>
                                                <Text style={{
                                                    fontFamily: FONTS.Inter.medium,
                                                    color: Colors.black,
                                                    fontSize: moderateScale(14),
                                                    marginTop: moderateScale(5)
                                                }}>{item.account_no}</Text>
                                                {/* <Text style={{
                                                    fontFamily: FONTS.Inter.medium,
                                                    color: Colors.black,
                                                    fontSize: moderateScale(14),
                                                    marginTop: moderateScale(5)
                                                }}>{item.branch_name}</Text> */}

                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: moderateScale(7)
                                                }}>
                                                    <Text style={{
                                                        fontFamily: FONTS.Inter.semibold,
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
                        </View>

                )
            }
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
        fontFamily: FONTS.Inter.semibold,
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    },
    add_button: {
        height: moderateScale(35),
        width: moderateScale(130),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.buttonColor,
        borderRadius: moderateScale(7),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10)
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
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export { MyBankAccount };
