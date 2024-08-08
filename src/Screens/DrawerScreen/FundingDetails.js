// Import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import FundingCard from '../../Components/DrawerCard/FundingCard';
import AllBottonComponent from '../../Components/BottomComponent/AllBottonComponent';
import HomeService from '../../Services/HomeServises';
import { useSelector } from 'react-redux';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');

const FundingDetails = ({ navigation }) => {
    const [fundingData, setFundingData] = useState([]);
    const { userData } = useSelector(state => state.User);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFundingDetails();
    }, []);

    const fetchFundingDetails = async () => {
        setLoading(true); 
        let data = {
            "user_id": userData?.id
        };
        HomeService.getfundDetails(data)
            .then((res) => {
                console.log('funddataaaaaaaaaaaaaaaaaaaresssssssssssssssssss', res);
                console.log('funddataaaaaaaaaaaaaaaaaaa', res.data);
                setLoading(false); 
                if (res && res.status === true) {
                    setFundingData(res.data);
                }
            })
            .catch((err) => {
                console.log('errrrr', err);
                setLoading(false); 
            });
    };

    return (
        <View style={styles.container}>
            <ScreenHeader />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Funding Details</Text>
                    </View>
                </View>
            </View>
            {
                loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={Colors.buttonColor} />
                    </View>
                ) : (<>
            {
                fundingData.length === 0 ?
                    <View style={styles.loader}>
                        <Image source={require('../../assets/images/nodata.png')} style={styles.nodata_sty} />
                        <View style={styles.button}>
                            <Text style={styles.button_txt}>No Data Found</Text>
                        </View>
                    </View>
                    :
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
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
                                    <Text style={styles.sl_txt}>Sub-Category</Text>
                                </View>

                                <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.sl_txt}>Commissions</Text>
                                </View>
                            </View>

                            <View>
                                {fundingData.map((item, index) => (
                                    <FundingCard item={item} index={index} key={index} />
                                ))}
                            </View>
                        </View>
                    </ScrollView>
            }
            </>)
}

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

// Define styles
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
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nodata_sty: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: 'contain',
        tintColor: 'rgba(95,37,158,0.3)',
    },
    button: {
        height: responsiveWidth(11),
        marginTop: responsiveWidth(5),
        marginBottom: responsiveWidth(6),
        marginHorizontal: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(280)
    },
    button_txt: {
        color: Colors.buttonColor,
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FundingDetails;
