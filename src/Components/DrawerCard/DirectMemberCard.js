//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

// create a component
const DirectMemberCard = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <View style={styles.list_view}>
                <View style={{ width: moderateScale(60), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.black
                    }}>{index + 1}</Text>

                </View>

                <View style={{ width: moderateScale(130), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.black
                    }}>{item.joiningDate}</Text>

                </View>

                <View style={{ width: moderateScale(150), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.black
                    }}>{item.name}</Text>
                    <Text style={{
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.black
                    }}>{item.phoneNo}</Text>

                </View>


                <View style={{ width: moderateScale(180), alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={2} style={{
                        maxWidth: '70%',
                        fontFamily: FONTS.semibold,
                        fontSize: moderateScale(12),
                        color: Colors.black
                    }}>{item.address}</Text>

                </View>

                <View style={{ width: moderateScale(200), alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        ...styles.button_sty,
                        backgroundColor: item.status === false ? '#FE0505' : '#00AB11'
                    }}>
                        <Text style={{
                            fontFamily: FONTS.bold,
                            fontSize: moderateScale(13),
                            color: Colors.secondaryFont
                        }}>{item.status === false ? 'INACTIVE' : 'Active Member'}</Text>
                    </TouchableOpacity>
                    {
                        item.status === false ?
                            <Text style={{
                                fontFamily: FONTS.semibold,
                                fontSize: moderateScale(12),
                                color: Colors.black
                            }} >{item.status_message}</Text>
                            :
                            <Text style={{
                                fontFamily: FONTS.semibold,
                                fontSize: moderateScale(12),
                                color: Colors.black
                            }}>{item.status_message}</Text>
                    }


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
        paddingHorizontal: 0
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
        height: moderateScale(35),
        width: moderateScale(110),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(10)
    }
});

//make this component available to the app
export default DirectMemberCard;
