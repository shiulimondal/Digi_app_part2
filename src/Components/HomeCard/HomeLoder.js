
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { moderateScale } from '../../Constants/PixelRatio';
const { height, width } = Dimensions.get('screen');

const HomeLoder = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{
                        backgroundColor: 'rgba(95,37,158,0.1)',
                        height: moderateScale(40),
                        width: width - moderateScale(20),
                        borderRadius: moderateScale(10),
                        alignSelf: 'center',
                        marginTop: moderateScale(10)
                    }}>
                    </View>
                </View>
                <View>
                    <View style={{
                        marginTop: moderateScale(10),
                        paddingHorizontal: moderateScale(10)
                    }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {[...Array(4)].map((_, index) => (
                                <View
                                    key={index}
                                    style={styles.categoryloder}
                                ></View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.homeB_loder}></View>
                <View style={{ ...styles.homeB_loder, height: moderateScale(220) }}></View>
                <View style={{
                    marginTop: moderateScale(-15),
                    paddingHorizontal: moderateScale(10)
                }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {[...Array(4)].map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    ...styles.categoryloder, width: moderateScale(156),
                                    height: moderateScale(100), marginRight: moderateScale(8),
                                }}
                            ></View>
                        ))}
                    </View>
                </View>

                <View style={{ ...styles.homeB_loder, borderRadius: (0) }}></View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeB_loder: {
        width: width - moderateScale(20),
        height: moderateScale(160),
        backgroundColor: 'rgba(95,37,158,0.1)',
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(15)
    },
    categoryloder: {
        backgroundColor: 'rgba(95,37,158,0.1)',
        height: moderateScale(90),
        width: moderateScale(94),
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        marginRight: moderateScale(7),
        marginBottom: moderateScale(15),
        paddingHorizontal: moderateScale(5)
    },
});

export default HomeLoder;


