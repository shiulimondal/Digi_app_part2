
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import FundingCard from '../../Components/DrawerCard/FundingCard';
import AllBottonComponent from '../../Components/BottomComponent/AllBottonComponent';


const { height, width } = Dimensions.get('window')
const FundingDetails = ({ navigation }) => {

    const fundingData = [
        {
            Date: '10/12/2024',
            paid: '₹541',
            remark: 'Add Profile',
            category: "Job",
            Commissions: 'D-1 ₹45.88'
        },
        {
            Date: '10/12/2024',
            paid: '₹541',
            remark: 'Add Profile',
            category: "Job",
            Commissions: 'D-1 ₹45.88'
        },
        {
            Date: '10/12/2024',
            paid: '₹541',
            remark: 'Add Profile',
            category: "Job",
            Commissions: 'D-1 ₹45.88'
        },

    ]
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

            <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                <View>
                    <View style={styles.list_view}>
                        <View style={{ width: moderateScale(90), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Date</Text>

                        </View>

                        <View style={{ width: moderateScale(130), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Paid</Text>

                        </View>

                        <View style={{ width: moderateScale(150), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Remarks</Text>

                        </View>


                        <View style={{ width: moderateScale(180), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Category</Text>

                        </View>

                        <View style={{ width: moderateScale(180), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Commissions</Text>

                        </View>
                    </View>

                    <View>
                        {
                            fundingData.map((item, index) => {
                                return (
                                    <FundingCard item={item} index={index} />
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>
            
            <View style={{
                height: moderateScale(60),
                backgroundColor: Colors.background,
                marginTop: moderateScale(10),
                elevation:4
            }}>
                <AllBottonComponent />
            </View>
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
    flatListContent: {
        paddingHorizontal: 10,
    },
    list_view: {
        height: moderateScale(50),
        backgroundColor: '#333333',
        flexDirection: 'row',
        borderTopRightRadius: moderateScale(10),
        borderTopLeftRadius: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        padding: moderateScale(5),
        width: width - 400
    },
    sl_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),

    }
});

//make this component available to the app
export default FundingDetails;

