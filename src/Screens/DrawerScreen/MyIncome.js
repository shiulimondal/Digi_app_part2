import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import AllBottonComponent from '../../Components/BottomComponent/AllBottonComponent';


const { height, width } = Dimensions.get('screen')
const MyIncome = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ScreenHeader />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Income</Text>
                    </View>
                </View>
            </View>
            <ScrollView howsVerticalScrollIndicator={false}>

                <View style={styles.primary_view}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            ...styles.primary_txt,
                            color: Colors.secondaryFont,
                            fontSize: moderateScale(16),
                        }}>My Total affiliate commission = 728</Text>
                    </View>

                    <View style={styles.secondary_view}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(16),
                            }}>Commission depth form 1 = </Text>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                            }}>₹500</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(16),
                            }}>Commission depth form 2 =</Text>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                            }}>₹228</Text>
                        </View>

                        <View style={styles.line_view} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 10 }}>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                            }}>Total Earning</Text>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                            }}>₹728</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={{
                                ...styles.primary_txt,
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(16),
                            }}>Total Withdrawal Amount(-)</Text>
                            <Text style={{
                                ...styles.primary_txt,
                                marginBottom: moderateScale(3),
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                            }}>₹650</Text>
                        </View>


                        <View style={styles.line_view} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={{
                                ...styles.primary_txt,
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(16),
                                marginBottom: moderateScale(2)
                            }}>Balance Amount</Text>
                            <Text style={{
                                ...styles.primary_txt,
                                color: Colors.secondaryFont,
                                fontSize: moderateScale(17),
                                marginBottom: moderateScale(2)
                            }}>₹3</Text>
                        </View>


                    </View>
                </View>


                <View style={styles.button_view}>
                    <Pressable style={styles.botton_sty}>
                        <Image source={require('../../assets/images/incomewithdraw.png')} 
                        style={{
                            height:moderateScale(20),
                            width:moderateScale(20),
                            resizeMode:'contain'
                        }}/>
                        <Text numberOfLines={2}style={styles.button_txt}>Withdrawal History</Text>
                    </Pressable>
                    <Pressable style={styles.botton_sty}>
                    <Image source={require('../../assets/images/incomeeye.png')}
                     style={{
                        height:moderateScale(20),
                        width:moderateScale(20),
                        resizeMode:'contain'
                    }}/>
                    <Text numberOfLines={2}style={styles.button_txt}>View Income Structure </Text>
                    </Pressable>
                </View>

                <Image source={require('../../assets/images/incomebanner.png')} style={styles.banner_sty} />

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cardColor
    },
    top_view: {
        backgroundColor: Colors.cardColor,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    primary_view: {
        backgroundColor: '#0F0BEB',
        padding: moderateScale(10),
        marginHorizontal: moderateScale(15),
        borderRadius: moderateScale(15),
        paddingHorizontal: moderateScale(0),
        paddingBottom: moderateScale(0),
        marginTop: moderateScale(15)
    },
    primary_txt: {
        fontFamily: FONTS.Inter.semibold,
        color: Colors.secondaryFont,
        marginBottom: moderateScale(10),
        fontSize: moderateScale(13)
    },
    secondary_view: {
        backgroundColor: '#266FFD',
        borderRadius: moderateScale(15),
        padding: moderateScale(10),
        paddingHorizontal: moderateScale(20)
    },
    amount_txt: {
        fontFamily: FONTS.Inter.semibold,
        color: Colors.secondaryFont,
        marginBottom: moderateScale(10),
        fontSize: moderateScale(15)
    },
    member_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.black,
        left: moderateScale(10)
    },
    price_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
        right: moderateScale(10)
    },
    view_button: {
        height: moderateScale(28),
        width: moderateScale(58),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.secondaryFont,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont,
        maxWidth:'60%',
        marginLeft:moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(20),
        color: Colors.secondaryFont
    },
    banner_sty: {
        height: moderateScale(180),
        width: width - moderateScale(30),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: moderateScale(15),
    },
    line_view: {
        borderWidth: 0.3,
        borderColor: Colors.secondaryFont,
        width: width - moderateScale(50),
        alignSelf: 'center'
    },
    button_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
        marginHorizontal:moderateScale(15)
    },
    botton_sty: {
        backgroundColor: '#2B26FD',
        width: moderateScale(147),
        height: moderateScale(45),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },

});

export { MyIncome };



