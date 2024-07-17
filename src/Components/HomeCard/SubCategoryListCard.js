//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native';
import { Card, Icon } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';
import NavigationService from '../../Services/Navigation';

// create a component
const { height, width } = Dimensions.get('screen');
const SubCategoryListCard = () => {
    return (
        <Card style={styles.container}>
            <View>
                <Image source={require('../../assets/images/searchSub.png')} style={styles.user_img} />
                <View style={styles.call_view}>
                    <LinearGradient style={styles.gradint_view} start={{ x: 0.3, y: 1 }} end={{ x: 1, y: 1 }} colors={['#00AB11', '#2AD200']} >


                        <Icon name='locked' type='Fontisto' size={16} />

                        {/* for---unlocl---------------------========================================== */}
                        {/* <Icon name='unlocked' type='Fontisto' size={16}/> */}
                        <Text style={styles.call_txt}>Call/ WhatsApp</Text>

                        {/* for---unlocl---------------------========================================== */}
                        {/* <TouchableOpacity>
                            <Icon name='call' type='Ionicons' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='whatsapp' type='FontAwesome' size={22} />
                        </TouchableOpacity> */}


                    </LinearGradient>
                </View>

            </View>
            <View style={styles.buttom_view}>
                <Image source={require('../../assets/images/location-pin.png')} style={styles.location_sty} />
                <Text style={styles.address_txt}>West Bengal, Birbhum</Text>
            </View>
            <View style={styles.buttom_view}>
                <Image source={require('../../assets/images/account.png')} style={styles.location_sty} />
                <Text style={styles.address_txt}>Suhana khatun</Text>
            </View>
            <View style={styles.buttom_view}>
                <Image source={require('../../assets/images/religions.png')} style={styles.location_sty} />
                <Text style={styles.address_txt}>Religion - Muslim</Text>
            </View>
            <View style={styles.buttom_view}>
                <Image source={require('../../assets/images/calendar1.png')} style={styles.location_sty} />
                <Text style={styles.address_txt}>Age - 24 year old</Text>
            </View>
            <Pressable onPress={()=>NavigationService.navigate('SubCategorySubscription')} style={styles.button_sty}>
                <Text style={styles.button_txt}>View Full BridData</Text>
                <Icon name='rightcircleo' type='AntDesign' color={Colors.secondaryFont} 
                style={{marginLeft:moderateScale(15)}} size={22}/>
            </Pressable>
        </Card>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        marginBottom:moderateScale(10)
    },
    user_img: {
        height: moderateScale(270),
        width: width - moderateScale(20),
        // resizeMode:'contain',
        borderRadius: moderateScale(10),
        alignSelf: 'center'
    },
    gradint_view: {
        height: moderateScale(40),
        width: moderateScale(120),
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        justifyContent: 'space-between'
    },
    call_view: {
        position: 'absolute',
        bottom: moderateScale(30),
        right: moderateScale(10)
    },
    call_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(10),
        color: Colors.black
    },
    buttom_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(10)
    },
    location_sty: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: '#888'
    },
    address_txt: {
        marginLeft: moderateScale(7),
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),
        color: Colors.black
    },
    button_sty: {
        height: moderateScale(48),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.buttonColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: moderateScale(15)
    },
    button_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(14),
        color: Colors.secondaryFont
    }
});

//make this component available to the app
export default SubCategoryListCard;