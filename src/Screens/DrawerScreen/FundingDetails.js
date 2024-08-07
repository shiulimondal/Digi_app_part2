
//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import FundingCard from '../../Components/DrawerCard/FundingCard';
import AllBottonComponent from '../../Components/BottomComponent/AllBottonComponent';
import HomeService from '../../Services/HomeServises';
import { useSelector } from 'react-redux';


const { height, width } = Dimensions.get('window')
const FundingDetails = ({ navigation }) => {
    const [fundingData, setfundingData] = useState({})
    const { userData } = useSelector(state => state.User)
    useEffect(() => {
        fatchFundingDetails()
    }, [])

    const fatchFundingDetails = async () => {
        let deta = {
            "user_id": userData?.id
        }
        HomeService.getfundDetails(deta)
            .then((res) => {
                console.log('funddataaaaaaaaaaaaaaaaaaaresssssssssssssssssss', res);
                console.log('funddataaaaaaaaaaaaaaaaaaa', res.data);
                if (res && res.status === true) {
                    setfundingData(res.data)
                }
            })
            .catch((err) => {
                console.log('errrrr', err);

            })

    };

    // const fundingData = [
    //     {
    //         Date: '10/12/2024',
    //         paid: '₹541',
    //         remark: 'Add Profile',
    //         category: "Job",
    //         subCat:"Teacher",
    //         Commissions: 'D-1 ₹45.88'
    //     },
    //     {
    //         Date: '10/12/2024',
    //         paid: '₹541',
    //         remark: 'Add Profile',
    //         category: "Job",
    //         subCat:"Teacher",
    //         Commissions: 'D-1 ₹45.88'
    //     },
    //     {
    //         Date: '10/12/2024',
    //         paid: '₹541',
    //         remark: 'Add Profile',
    //         category: "Business",
    //         subCat:"Hotel",
    //         Commissions: 'D-1 ₹45.88'
    //     },

    // ]

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
                        <View style={{ width: moderateScale(65), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Date</Text>

                        </View>

                        <View style={{ width: moderateScale(90), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Paid</Text>

                        </View>

                        <View style={{ width: moderateScale(60), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Remarks</Text>

                        </View>


                        <View style={{ width: moderateScale(110), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Category</Text>

                        </View>
                        <View style={{ width: moderateScale(110), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>SUb-Category</Text>

                        </View>

                        <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Commissions</Text>

                        </View>
                    </View>

                    <View>
                        {fundingData &&
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
                elevation: 4
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
        height: moderateScale(40),
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
        fontSize: moderateScale(12),

    }
});

//make this component available to the app
export default FundingDetails;

