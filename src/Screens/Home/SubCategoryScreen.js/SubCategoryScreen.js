//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator, Image } from 'react-native';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Colors } from '../../../Constants/Colors';
import SubCategoryCard from '../../../Components/HomeCard/SubCategoryCard';
import { AppButton, Icon } from 'react-native-basic-elements';
import { ScrollView } from 'react-native';
import NavigationService from '../../../Services/Navigation';
import HomeService from '../../../Services/HomeServises';
import { useRoute } from '@react-navigation/native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

// create a component
const SubCategoryScreen = () => {
    const [subcategoryData, setsubcategoryData] = useState([])
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const catID = route.params.cat_id;
    const categoryName = route.params.cat_name;

    useEffect(() => {
        fatchSubCategory();
    }, [])

    const fatchSubCategory = async () => {
        setLoading(true);
        let data = {
            "category_id": catID
        }
        HomeService.getsub_CategoryData(data)
            .then((res) => {
                if (res && res.success == true) {
                    setLoading(false);
                    console.log('subbbbbbbbbbbbbbbbbbbbb', res.data);
                    setsubcategoryData(res.data)
                }
            })
            .catch((err) => {
                setLoading(false);
            })
    }

    const categoryData = [
        {
            cat_logo: require('../../../assets/images/sub1.png'),
            title: 'Find Bride'
        },
        {
            cat_logo: require('../../../assets/images/sub2.png'),
            title: 'Find Groom'
        },
        {
            cat_logo: require('../../../assets/images/sub3.png'),
            title: 'Caterer'
        },
        {
            cat_logo: require('../../../assets/images/sub4.png'),
            title: 'Photographer'
        },
        {
            cat_logo: require('../../../assets/images/sub5.png'),
            title: 'Cooks'
        },
        {
            cat_logo: require('../../../assets/images/sub6.png'),
            title: 'Musical party '
        }
    ];

    return (
        <View style={styles.container}>
            <ScreenHeader />

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.buttonColor} />
                </View>
            ) : (
                <>
                    {
                        subcategoryData.length === 0 ?
                            <View style={styles.loader}>
                                <Image source={require('../../../assets/images/nodata.png')} style={styles.nodata_sty} />
                                <View style={styles.button}>
                                    <Text style={styles.button_txt}>No Sub-Category Found</Text>
                                </View>
                            </View>
                            :
                            <>
                                <View style={styles.top_view}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <Pressable onPress={() => NavigationService.goBack()}>
                                                <Icon name='left' type='AntDesign' size={22} />
                                            </Pressable>
                                        </View>
                                        <View style={{ alignItems: 'center', flex: 1 }}>
                                            <Text style={styles.header_txt}>{categoryName} Subcategory</Text>
                                        </View>
                                    </View>
                                </View>
                                <ScrollView>
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingHorizontal: moderateScale(15),
                                        justifyContent: 'space-between',
                                        marginTop: moderateScale(7)
                                    }}>
                                        {
                                            subcategoryData.map((item, index) => {
                                                return (
                                                    <SubCategoryCard item={item} key={index} />
                                                )
                                            })
                                        }

                                    </View>

                                </ScrollView>
                            </>
                    }


                </>
            )}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    top_view: {
        backgroundColor: Colors.background,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
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
});

//make this component available to the app
export default SubCategoryScreen;
