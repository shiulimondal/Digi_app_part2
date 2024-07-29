//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Card } from 'react-native-basic-elements';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';


const { height, width } = Dimensions.get('screen')
const IncomeStructure = () => {
    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Funding  Details</Text>
                    </View>
                </View>
            </View>
            <View style={styles.message_view}>
                <Text style={styles.total_message_txt}>Commission will keep coming. Life time</Text>
            </View>

            <ScrollView howsVerticalScrollIndicator={false}>
            <View style={styles.primary_view}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            ...styles.primary_txt,
                            color: Colors.secondaryFont,
                            fontSize: moderateScale(14),
                        }}>Commission will come  (Upto 2 Depth)</Text>
                    </View>

                    <View style={styles.secondary_view}>
                        <View style={styles.inner_view}>
                            <Text style={{
                               ...styles.inner_txt
                            }}>From Second Level Member (Depth - 2)      </Text>
                            <Text style={{
                               ...styles.inner_txt
                            }}>Rs - 15% </Text>
                        </View>
                        <View style={{...styles.inner_view,borderTopWidth:1,borderColor:'#fff'}}>
                            <Text  style={{
                               ...styles.inner_txt
                            }}>From Second Level Member (Depth - 2)</Text>
                            <Text style={{
                               ...styles.inner_txt
                            }}>Rs - 5%</Text>
                        </View>


                    </View>
                </View>


                <Image source={require('../../../assets/images/incomebanner.png')} style={styles.banner_sty} />

            </ScrollView>
        </View>
    );
};

// define your styles
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
    message_view: {
        backgroundColor: 'rgba(2, 174, 174, 0.3)',
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        color: Colors.black
    },
    primary_view: {
        backgroundColor: '#2B26FD',
        padding: moderateScale(10),
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
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
        backgroundColor:'#999',
        borderRadius: moderateScale(0),
        borderBottomLeftRadius:moderateScale(10),
        borderBottomRightRadius:moderateScale(10),

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
    banner_sty: {
        height: moderateScale(180),
        width: width - moderateScale(20),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: moderateScale(15),
    },
    inner_view:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:moderateScale(10)
    },
    inner_txt:{
        marginBottom: moderateScale(3),
        color: Colors.secondaryFont,
        fontSize: moderateScale(12),
        fontFamily:FONTS.Inter.semibold
    }
});

//make this component available to the app
export default IncomeStructure;
