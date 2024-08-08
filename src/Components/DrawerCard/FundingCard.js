//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

// create a component
const FundingCard = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <View style={styles.list_view}>
                <View style={{ width: moderateScale(60), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(9),
                        color: Colors.secondaryFont
                    }}>{item.date}</Text>

                </View>

                <View style={{ width: moderateScale(80), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: Colors.secondaryFont
                    }}>₹ {item.amount}</Text>

                </View>

                <View style={{ width: moderateScale(65), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: Colors.secondaryFont
                    }}>----</Text>

                </View>


                <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: Colors.secondaryFont,
                        maxWidth:'70%'
                    }}>{item.category}</Text>

                </View>
                <View style={{ width: moderateScale(110), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: Colors.secondaryFont
                    }}>{item.SubCategory}</Text>

                </View>

                <View style={{ width: moderateScale(120), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: Colors.secondaryFont
                    }}>{item.commission_amount}</Text>


                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        marginHorizontal: moderateScale(15),
        borderColor: Colors.grey,
        padding: moderateScale(9),
        paddingHorizontal: 0,
        backgroundColor: Colors.buttonColor
    },
    list_view: {
        flexDirection: 'row',
        borderTopRightRadius: moderateScale(10),
        borderTopLeftRadius: moderateScale(10),
        marginHorizontal: moderateScale(15),
        // marginTop: moderateScale(15),
        // padding: moderateScale(2)
    },
    button_sty: {
        height: moderateScale(28),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(7)
    }
});

//make this component available to the app
export default FundingCard;
