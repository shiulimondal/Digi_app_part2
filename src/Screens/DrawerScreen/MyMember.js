import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity, Image, Dimensions,ScrollView } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';




const { height, width } = Dimensions.get('screen')
const MyMember = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation} />

            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Member</Text>
                    </View>
                </View>
            </View>
            <ScrollView howsVerticalScrollIndicator={false}>
                <View style={styles.primary_view}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.primary_txt}>D1 + D2 Your total Member = 400</Text>
                    </View>

                    <View style={styles.secondary_view}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: moderateScale(10), marginBottom: moderateScale(20) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="user-alt" type="FontAwesome5" color={'#fff'} />
                                <Text style={styles.member_txt}>Direct Member</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.price_txt}>200</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MyDirectMember')}
                                    style={styles.view_button}>
                                    <Text style={styles.button_txt}>View</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(15) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="user-friends" type="FontAwesome5" color={'#fff'} />
                                <Text style={styles.member_txt}>Depth-2 Member</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.price_txt}>200</Text>
                                <TouchableOpacity 
                                 onPress={() => navigation.navigate('MyDepthMember')}
                                style={styles.view_button}>
                                    <Text style={styles.button_txt}>View</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>
                </View>

                <View style={styles.message_view}>
                    <Text style={styles.total_message_txt}>Your Total Member will
                        Generate Commission</Text>
                </View>

                <Image source={require('../../assets/images/memberBanner.png')} style={styles.banner_sty} />

            </ScrollView>
        </View>
    );
};

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
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    primary_view: {
        backgroundColor: Colors.blue,
        padding: moderateScale(10),
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(15),
        paddingHorizontal: moderateScale(0),
        paddingBottom: moderateScale(0),
        marginTop: moderateScale(15)
    },
    primary_txt: {
        fontFamily: FONTS.semibold,
        color: Colors.secondaryFont,
        marginBottom: moderateScale(10),
        fontSize: moderateScale(13)
    },
    secondary_view: {
        backgroundColor: '#26C9EC',
        borderRadius: moderateScale(15),
        padding: moderateScale(10),
    },
    amount_txt: {
        fontFamily: FONTS.semibold,
        color: Colors.secondaryFont,
        marginBottom: moderateScale(10),
        fontSize: moderateScale(15)
    },
    member_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(14),
        color: Colors.black,
        left: moderateScale(10)
    },
    price_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(14),
        color: Colors.black,
        right: moderateScale(10)
    },
    view_button: {
        height: moderateScale(28),
        width: moderateScale(58),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.secondaryFont,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(12),
        color: Colors.buttonColor
    },
    message_view: {
        backgroundColor: '#2E99E7',
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(25),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    total_message_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(25),
        color: Colors.secondaryFont
    },
    banner_sty: {
        height: moderateScale(180),
        width: width - moderateScale(30),
        alignSelf: 'center',
        resizeMode: 'contain',
    }
});

export { MyMember };


