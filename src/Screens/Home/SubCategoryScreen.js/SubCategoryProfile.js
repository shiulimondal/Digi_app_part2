//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { moderateScale } from '../../../Constants/PixelRatio';
import { Colors } from '../../../Constants/Colors';
import NavigationService from '../../../Services/Navigation';
import { FONTS } from '../../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen')
// create a component
const SubCategoryProfile = () => {
    const profileData = [
        {
            profile: require('../../../assets/images/demo1.jpg')
        },
        {
            profile: require('../../../assets/images/demo2.jpg')
        },
        {
            profile: require('../../../assets/images/demo4.jpg')
        },
        {
            profile: require('../../../assets/images/demo3.jpg')
        }
    ]
    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Profile Details</Text>
                    </View>
                </View>
            </View>

            <View style={{
                height: height / 2.5
            }}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    // index={2}
                    showPagination
                    paginationStyleItemActive={{
                        height: moderateScale(9),
                        width: moderateScale(9),
                        borderRadius: moderateScale(7),
                        backgroundColor: Colors.buttonColor
                    }}
                    paginationStyleItemInactive={{
                        height: moderateScale(9),
                        width: moderateScale(9),
                        borderRadius: moderateScale(7),
                        backgroundColor: Colors.white
                    }}
                    data={profileData}
                    renderItem={({ item }) => (
                        <View style={{ height: height / 2.5 }}>
                            <Image source={item?.profile}
                                style={{
                                    height: height / 2.5,
                                    width: width,
                                    resizeMode: 'cover'
                                }}
                            />
                        </View>
                    )}
                />
            </View>
            <View style={{ backgroundColor: Colors.cardColor }}>
                <View style={{
                    backgroundColor: Colors.secondaryFont,
                    borderTopRightRadius: moderateScale(17),
                    borderTopLeftRadius: moderateScale(17)
                }}>
                    <View style={styles.userdetails_view}>
                        <View>
                            <Text style={styles.userName}>Sumana Mandal</Text>
                            <View style={styles.totalrating_view}>
                                <View style={styles.rating_view}>
                                    <Text style={styles.rating_txt}>5.0</Text>
                                    <Icon name='star' type='FontAwesome' size={14} color={Colors.secondaryFont} />
                                </View>
                                <Text style={styles.rating_txt_number}>(10025 Rating)</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.icon_view}>
                                <Icon name='phone-alt' type='FontAwesome5' size={15} />
                            </View>
                            
                        </View>
                    </View>
                </View>

            </View>

        </View >
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    userdetails_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15)
    },
    userName: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        color: Colors.black
    },
    rating_view: {
        alignItems: 'center',
        flexDirection: 'row',
        height: moderateScale(20),
        width: moderateScale(45),
        backgroundColor: '#2AD200',
        borderTopRightRadius: moderateScale(5),
        borderBottomRightRadius: moderateScale(5),
        borderRadius: moderateScale(2),
        justifyContent: 'center'
    },
    rating_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont,
        right: moderateScale(4)
    },
    totalrating_view: {
        flexDirection: 'row'
    },
    rating_txt_number: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(12),
        color: Colors.grey,
        marginLeft: moderateScale(7)
    },
    icon_view: {
        height: moderateScale(30),
        width: moderateScale(30),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2AD200'
    }
});

//make this component available to the app
export default SubCategoryProfile;
