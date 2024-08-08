//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { moderateScale } from '../../../Constants/PixelRatio';
import { Colors } from '../../../Constants/Colors';
import NavigationService from '../../../Services/Navigation';
import { FONTS } from '../../../Constants/Fonts';
import { Card, Icon } from 'react-native-basic-elements';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import AllBottonComponent from '../../../Components/BottomComponent/AllBottonComponent';

const { height, width } = Dimensions.get('screen')
// create a component
const SubCategoryProfile = () => {
    const [showReply, setShowReply] = useState(false);
    const toggleReply = () => {
        setShowReply(prevShowReply => !prevShowReply);
    };
    const [rating, setRating] = useState(3.5);
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.top_view}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={styles.header_txt}>Profile Details</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: height / 2.5 }}>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        showPagination
                        paginationStyle={{
                            bottom: moderateScale(14),
                        }}
                        paginationStyleItemActive={{
                            height: moderateScale(9),
                            width: moderateScale(9),
                            borderRadius: moderateScale(7),
                            backgroundColor: Colors.buttonColor,
                            marginHorizontal: moderateScale(3),
                        }}
                        paginationStyleItemInactive={{
                            height: moderateScale(9),
                            width: moderateScale(9),
                            borderRadius: moderateScale(7),
                            backgroundColor: Colors.white,
                            marginHorizontal: moderateScale(3),
                        }}
                        data={profileData}
                        renderItem={({ item }) => (
                            <View style={{ height: height / 2.7, }}>
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
                <View style={styles.main_view}>
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

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.icon_view}>
                                <Icon name='phone-alt' type='FontAwesome5' size={15} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/whatsapp.png')} style={styles.whatsapp_img} />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.details_view}>
                        <Text style={styles.details_txt_sty}>Details</Text>
                        <Pressable onPress={toggleReply}>
                            {showReply ? (
                                <Icon name='down' type='AntDesign' />
                            ) : (
                                <Icon name='right' type='AntDesign' />
                            )}
                        </Pressable>
                    </View>
                    <View>
                        {showReply && (
                            <View>
                                <View style={styles.lineview} />
                                <View>
                                    <Text style={styles.age_txt}>Age : <Text style={styles.age_data}>11/12/2000 (24 year old)</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Religion : <Text style={styles.age_data}>Muslim</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>State : <Text style={styles.age_data}>West Bengal</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>District : <Text style={styles.age_data}>Birbhum</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>City : <Text style={styles.age_data}>Birbhum</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Annual income : <Text style={styles.age_data}>12LPA</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Height : <Text style={styles.age_data}>5.9"</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Marital Status : <Text style={styles.age_data}>Single</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Qualification : <Text style={styles.age_data}>B.Tech</Text></Text>
                                    <View style={styles.lineview} />
                                    <Text style={styles.age_txt}>Occupation : <Text style={styles.age_data}>Devlopment Executive</Text></Text>
                                    <View style={styles.lineview} />
                                </View>
                            </View>

                        )}
                    </View>
                    <Text style={styles.About_txt}>About</Text>
                    <Card style={styles.about_view}>
                        <Text style={styles.about_details}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</Text>
                    </Card>

                    <Text style={styles.About_txt}>Review</Text>
                    <Card style={styles.about_view}>
                        <View style={styles.review_txt}>
                            <StarRatingDisplay
                                rating={rating}
                                onChange={setRating}
                                enableHalfStar
                                starSize={15}
                                starStyle={{ marginHorizontal: 0.5 }}
                            />
                            <Text style={styles.rating_number_txt}>3.5</Text>
                        </View>
                        <Text style={styles.about_details}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</Text>
                    </Card>

                    <Card style={styles.about_view}>
                        <View style={styles.review_txt}>
                            <StarRatingDisplay
                                rating={rating}
                                onChange={setRating}
                                enableHalfStar
                                starSize={15}
                                starStyle={{ marginHorizontal: 0.5 }}
                            />
                            <Text style={styles.rating_number_txt}>3.5</Text>
                        </View>
                        <Text style={styles.about_details}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</Text>
                    </Card>

                    <Card style={styles.about_view}>
                        <View style={styles.review_txt}>
                            <StarRatingDisplay
                                rating={rating}
                                onChange={setRating}
                                enableHalfStar
                                starSize={15}
                                starStyle={{ marginHorizontal: 0.5 }}
                            />
                            <Text style={styles.rating_number_txt}>3.5</Text>
                        </View>
                        <Text style={styles.about_details}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</Text>
                    </Card>

                    <Card style={styles.about_view}>
                        <View style={styles.review_txt}>
                            <StarRatingDisplay
                                rating={rating}
                                onChange={setRating}
                                enableHalfStar
                                starSize={15}
                                starStyle={{ marginHorizontal: 0.5 }}
                            />
                            <Text style={styles.rating_number_txt}>3.5</Text>
                        </View>
                        <Text style={styles.about_details}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</Text>
                    </Card>

                </View>
            </ScrollView>
            <View style={{ flex: 1 }} />
            <View style={{
                height: moderateScale(60),
                bottom: 0,
                backgroundColor: Colors.background,
                // marginTop: moderateScale(10),
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
    userdetails_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
    },
    main_view: {
        backgroundColor: Colors.secondaryFont,
        borderTopRightRadius: moderateScale(17),
        borderTopLeftRadius: moderateScale(17),
        marginTop: moderateScale(-10),
        paddingBottom: moderateScale(20)
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
        flexDirection: 'row',
        marginTop: moderateScale(10)
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
        backgroundColor: '#2AD200',
        marginRight: moderateScale(12)
    },
    whatsapp_img: {
        height: moderateScale(31),
        width: moderateScale(31),
        resizeMode: 'contain'
    },
    details_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15)
    },
    details_txt_sty: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.black
    },
    lineview: {
        borderWidth: 0.5,
        marginHorizontal: moderateScale(15),
        marginVertical: moderateScale(4),
        borderColor: '#D9D9D9'
    },
    age_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.black,
        padding: moderateScale(3),
        paddingHorizontal: moderateScale(15)
    },
    age_data: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(13),
        color: '#333333'
    },
    About_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.black,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(10)
    },
    about_view: {
        borderWidth: moderateScale(1),
        borderColor: '#D9D9D9',
        padding: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(7),
        borderRadius: moderateScale(10),
    },
    review_txt: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating_number_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(12),
        color: Colors.black,
        marginLeft: moderateScale(5)
    },
    about_details: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(12),
        color: '#333333'
    }
});

//make this component available to the app
export default SubCategoryProfile;
