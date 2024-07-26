//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import NotificationCard from '../../Components/HomeCard/NotifitationCard';
import { Icon } from 'react-native-basic-elements'
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeHeader from '../../Components/Header/HomeHeader';

// create a component
const NotificationScreen = ({ navigation }) => {
    const NotificationData = [
        {
            user_logo: 'A',
            title: 'Referral Joining ',
            body: 'You won ₹50 for referral join',
            circle_bg: 'green'
        },
        {
            user_logo: '50%',
            title: 'Get more Referral Earning',
            body: 'Join 3 user to get this offer',
            circle_bg: 'blue'
        },
        {
            user_logo: 'GM',
            title: 'Referral Joining ',
            body: 'You won ₹50 for referral join',
            circle_bg: 'red'
        },
        {
            user_logo: '70%',
            title: 'Get more Referral Earning',
            body: 'Join 3 user to get this offer',
            circle_bg: 'yellow'
        },
        {
            user_logo: 'R',
            title: 'Referral Joining ',
            body: 'You won ₹50 for referral join',
            circle_bg: 'pink'
        },
    ];
    return (
        <View style={styles.container}>
            <HomeHeader navigation={navigation} />
            <View style={styles.top_view}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-end'}}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{alignItems:'center',flex:1}}>
                        <Text style={styles.header_txt}>Notification</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={NotificationData}
                renderItem={({ item, index }) => (
                    <NotificationCard item={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
        fontSize: moderateScale(18),
        color: Colors.black,
    }
});

//make this component available to the app
export default NotificationScreen;
