//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, Pressable, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Icon, RadioButton } from 'react-native-basic-elements';
import NavigationService from '../../../Services/Navigation';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Colors } from '../../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import HomeService from '../../../Services/HomeServises';
import PhonePePaymentSDK from 'react-native-phonepe-pg'
import { useSelector } from 'react-redux';
import sha256 from 'sha256'
import Base64 from 'react-native-base64'
import Toast from "react-native-simple-toast";

// create a component
const { height, width } = Dimensions.get('screen');
const SubCategorySubscription = () => {
    const { userData } = useSelector(state => state.User)
    const [selected, setSelected] = useState(null);
    const [subscriptionList, setsubscriptionList] = useState([]);
    const [price, setprice] = useState('');
    const [planName, setplanName] = useState('');
    const [mrp, setmrp] = useState('');
    const [Day, setday] = useState('');
    const [planId, setplanId] = useState('');
    console.log('hhhhhhhhhhhhhhhhhhhhhhhh',selected);

    const handleSelection = (planName) => {
        setSelected(planName.name);
        setprice(planName.price)
        setplanName(planName.name)
        setmrp(planName.mrp)
        setday(planName.days)
        setplanId(planName.id)
    };

    useEffect(() => {
        Getsubscription_list();
    }, [])
    const Getsubscription_list = async () => {
        HomeService.fatch_subscription_list()
            .then((res) => {
                if (res && res.status == true) {
                    console.log('subscriptionnnnnnnnnnnnttttttttttttttt', res.data);
                    setsubscriptionList(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [environment, setenvironment] = useState('SANDBOX');
    const [merchantId, setmerchantId] = useState('PGTESTPAYUAT86');
    const [appId, setappId] = useState(null);
    const [enableLogging, setenableLogging] = useState(true);

    const genarateId = () => {
        const timestamp = Date.now();
        const ramdom = Math.floor(Math.random() * 1000000);
        const merchantPrefix = "T";
        return `${merchantPrefix}${timestamp}${ramdom}`
    }

    const submitPayment = () => {
        // PhonePePaymentSDK.init(environment, merchantId, appId, enableLogging).then(res => {
        //     const requestBody = {
        //         "merchantId": merchantId,
        //         "merchantTransactionId": genarateId(),
        //         "merchantUserId": "",
        //         "amount": (price * 100),
        //         "mobileNumber": userData.phone,
        //         "callbackUrl": "",
        //         "paymentInstrument": {
        //             "type": "PAY_PAGE",
        //         },

        //         // "merchantId": merchantId,
        //         // "merchantTransactionId": "MT7850590068188104",
        //         // "merchantUserId": "MUID123",
        //         // "amount": (price * 100),
        //         // "redirectUrl": "https://webhook.site/redirect-url",
        //         // "redirectMode": "REDIRECT",
        //         // "callbackUrl": "https://webhook.site/callback-url",
        //         // "mobileNumber": "9999999999",
        //         // "paymentInstrument": {
        //         //   "type": "PAY_PAGE"
        //         // }

        //     }
        //     const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        //     const salt_Index = "1";
        //     const payload = JSON.stringify(requestBody);
        //     const payload_main = Base64.encode(payload);
        //     const string = payload_main + "/pg/v1/pay" + salt_key;
        //     const checksum = sha256(string) + "###" + salt_Index;

        //     PhonePePaymentSDK.startTransaction(
        //         payload_main,  
        //         checksum,     
        //         null,          
        //         null                  
        //     ).then(response => {
        //         console.log('Transaction started successfully:', response);
        //     }).catch(err => {
        //         console.log('Error starting transaction:', err);
        //     });

        // }).catch(err => {
        //     console.log(err);
        // })

        const data = {
            "subscription_id": planId,
            "order_id": "167776676767",
            "payment_id": "pay_83939393"
        }
        console.log('gerrrrrrrrrrrrr',data);
        HomeService.submitSubscriptionData(data)
        .then((res)=>{
            if (res && res.status === true) {
                Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                NavigationService.navigate('BottomTab')
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return (
        <View style={styles.container}>
            <ScreenHeader />
            <ScrollView>
                <ImageBackground source={require('../../../assets/images/primeback.png')} style={styles.back_img}>
                    <View style={styles.top_view}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Pressable onPress={() => NavigationService.goBack()}>
                                    <Icon name='chevron-left' type='FontAwesome5' size={23} />
                                </Pressable>
                            </View>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={styles.header_txt}>Buy Premium plan</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={require('../../../assets/images/searchSub.png')} style={styles.middle_img} />
                    <View style={styles.bannerbotton_sty}>
                        <Text style={styles.bannerbutton_txt}>premium member</Text>
                    </View>
                    <View style={styles.message_view}>
                        <Text style={styles.total_message_txt}>Buy premium plan now to see the full details of Razia Khatun and more than 500 profile and connect to the phone call.</Text>
                    </View>
                </ImageBackground>
                <Text style={{
                    ...styles.plan_top_txt,
                    color: Colors.buttonColor,
                    marginTop: moderateScale(15), fontSize: moderateScale(14)
                }}>Payment plans chosen exclusively for you</Text>
                {
                    subscriptionList.length === 0 ?
                    <ActivityIndicator size="large" color={Colors.buttonColor} style={{ marginTop: height / 3 }} />
                    :
                    <>
                       {
                    subscriptionList.map((item, index) => {
                        return (
                            <View key={index} style={styles.plan_main_view}>
                                {
                                    item.name === "Annual plan" ?
                                        <View style={styles.plan_top_view}>
                                            <Image source={require('../../../assets/images/anplan.png')}
                                              style={{height:moderateScale(45),width:moderateScale(240),resizeMode:'contain'}}
                                            />
                                          
                                        </View>
                                        :
                                        null
                                }

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: moderateScale(10),
                                    paddingHorizontal: moderateScale(10)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton
                                            selected={selected === item.name}
                                            onChange={() => handleSelection(item)}
                                            size={22}
                                            activeColor={Colors.buttonColor}
                                            inactiveColor={Colors.buttonColor}
                                        />
                                        <Text style={styles.annualplan_txt}>{item.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.price_txt}>₹{item.price}/{item.days} Days</Text>
                                        <Text style={styles.dis_price_txt}>₹{item.mrp}/{item.days} Days</Text>
                                    </View>
                                </View>
                                <View style={{
                                    marginTop: moderateScale(10)
                                }}>
                                    {selected && (
                                        <View style={styles.plan_ditels}>
                                            <View style={styles.img_view}>
                                                <Image source={require('../../../assets/images/use_sub.png')}
                                                    style={{ height: moderateScale(30), width: moderateScale(30) }} />
                                            </View>
                                            <Text numberOfLines={4} style={styles.plan_bottom_txt}>More than 10,000 people are enjoying the benefits of premium membership </Text>
                                        </View>

                                    )}
                                </View>
                            </View>
                        )
                    })
                }
                    </>
                }
             


            </ScrollView>

            {selected && (
                <View style={styles.buttom_view}>
                    <View>
                        <Text style={styles.anunal_txt}>{planName}</Text>
                        <Text style={{
                            ...styles.anunal_txt,
                            fontFamily: FONTS.bold,
                            fontSize: moderateScale(17)
                        }}>₹{price}{' '}
                            <Text style={{ ...styles.dis_price_txt, color: Colors.secondaryFont }}>
                                {' '}₹{mrp}/{Day} Days
                            </Text>
                        </Text>
                        <Text style={styles.anunal_txt}>Save 50 %</Text>
                    </View>
                    <TouchableOpacity onPress={() => submitPayment()}>
                        <LinearGradient style={styles.gradint_view} start={{ x: 0.3, y: 1 }} end={{ x: 1, y: 1 }}
                            colors={['#00AB11', '#2AD200']} >

                            <Text style={styles.paynow_txt}>Pay Now</Text>
                            <Icon name='arrowright' type='AntDesign' color={Colors.secondaryFont} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
};

export default SubCategorySubscription;

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back_img: {
        height: height / 2.3,
        width: width,
    },
    top_view: {
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    middle_img: {
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(50),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    bannerbotton_sty: {
        backgroundColor: '#2AD200',
        width: moderateScale(180),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(20),
        alignSelf: 'center',
        marginTop: moderateScale(10)
    },
    bannerbutton_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.secondaryFont
    },
    message_view: {
        backgroundColor: Colors.buttonColor,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(25),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.secondaryFont,
        textAlign: 'center',
        maxWidth: '96%'
    },
    plan_top_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
    plan_top_view: {
        // backgroundColor: Colors.buttonColor,
        // width: moderateScale(200),
        alignSelf: 'center',
        top: moderateScale(-23),
        // padding: moderateScale(3)
    },
    plan_main_view: {
        borderRadius: moderateScale(15),
        borderWidth: 2,
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(20),
        borderColor: Colors.buttonColor,
        marginBottom: moderateScale(20)
    },
    price_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        color: Colors.black
    },
    dis_price_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        color: Colors.red,
        textDecorationLine: 'line-through'
    },
    plan_ditels: {
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(19),
        flexDirection: 'row',
        alignItems: 'center'
    },
    img_view: {
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(50)
    },
    plan_bottom_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(12),
        marginLeft: moderateScale(15),
        maxWidth: '70%',
        color: Colors.black
    },
    buttom_view: {
        height: moderateScale(80),
        backgroundColor: Colors.buttonColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15),
        alignItems: 'center'
    },
    annualplan_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10),
        color: Colors.black
    },
    anunal_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
    gradint_view: {
        height: moderateScale(45),
        width: moderateScale(90),
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        justifyContent: 'space-between'
    },
    paynow_txt: {
        fontFamily: FONTS.Inter.bold,
        fontSize: moderateScale(13),
        color: Colors.secondaryFont
    }
});

//make this component available to the app

