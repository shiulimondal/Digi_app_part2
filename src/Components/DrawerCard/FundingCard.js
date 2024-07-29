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
                <View style={{ width: moderateScale(80), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.secondaryFont
                    }}>{item.Date}</Text>

                </View>

                <View style={{ width: moderateScale(130), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.secondaryFont
                    }}>{item.paid}</Text>

                </View>

                <View style={{ width: moderateScale(150), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.secondaryFont
                    }}>{item.remark}</Text>

                </View>


                <View style={{ width: moderateScale(160), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.secondaryFont
                    }}>{item.category}</Text>

                </View>

                <View style={{ width: moderateScale(200), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.secondaryFont
                    }}>{item.Commissions}</Text>


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
        padding: moderateScale(10),
        paddingHorizontal: 0,
        backgroundColor: Colors.buttonColor
    },
    list_view: {
        flexDirection: 'row',
        borderTopRightRadius: moderateScale(10),
        borderTopLeftRadius: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        padding: moderateScale(2)
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
