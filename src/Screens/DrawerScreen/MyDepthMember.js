//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeHeader from '../../Components/Header/HomeHeader';

import DepthMemberCard from '../../Components/DrawerCard/DepthMemberCard';


const { height, width } = Dimensions.get('window')
const MyDepthMember = ({ navigation }) => {

    const direactMenverData = [
        {
            sl_no: "",
            joiningDate: '10/12/2024',
            name: 'HAPI MD KHAN ',
            phoneNo: '9876543210',
            address: "West Bengal Birbhum",
            status: false,
            status_message: 'Not paid member'
        },
        {
            sl_no: "",
            joiningDate: '10/12/2024',
            name: 'Altab Hossain',
            phoneNo: '9876543210',
            address: "West Bengal Birbhum",
            status: true,
            status_message: 'Service user Find groom'
        },
        {
            sl_no: "",
            joiningDate: '10/12/2024',
            name: 'Rabis Kumar',
            phoneNo: '9876543210',
            address: "West Bengal Mursidabad",
            status: true,
            status_message: 'Add Profile Mechanic'
        },
    ]
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
                        <Text style={styles.header_txt}>My Depth  2 Members</Text>
                    </View>
                </View>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                <View>
                    <View style={styles.list_view}>
                        <View style={{ width: moderateScale(80), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>Sl NO.</Text>

                        </View>

                        <View style={{ width: moderateScale(130), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>JOINING DATE</Text>

                        </View>

                        <View style={{ width: moderateScale(150), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>NAME</Text>

                        </View>


                        <View style={{ width: moderateScale(180), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>ADDRESS</Text>

                        </View>

                        <View style={{ width: moderateScale(200), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.sl_txt}>STATUS</Text>

                        </View>
                    </View>


                    <View>
                        {
                            direactMenverData.map((item, index) => {
                                return (
                                    <DepthMemberCard item={item} index={index} />
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>
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
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    flatListContent: {
        paddingHorizontal: 10,
        // backgroundColor: 'green'
    },
    list_view: {
        height: moderateScale(50),
        backgroundColor: Colors.black,
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
        fontFamily:FONTS.semibold,
        fontSize:moderateScale(17),
       
    }
});

//make this component available to the app
export default MyDepthMember;
