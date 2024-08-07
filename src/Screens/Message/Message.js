//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import NavigationService from '../../Services/Navigation';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import MessageList from '../../Components/MessageCard/MessageList';
import HomeService from '../../Services/HomeServises';
import { Image } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

// create a component
const Message = () => {
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMessage_list();
    }, []);

    const getMessage_list = async () => {
        setLoading(true);
        HomeService.getMessage_list()
            .then((res) => {
                setLoading(false);
                if (res && res.status === true) {
                    // console.log('listttttttttttttttttttt================', res.data);
                    // const reversedMessages = res.data.reverse();
                    setMessageList(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };
    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                        <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Message</Text>
                    </View>
                </View>
            </View>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.buttonColor} />
                </View>
            ) : messageList.length === 0 ? (
                <View style={styles.loader}>
                    <Image source={require('../../assets/images/nodata.png')} style={styles.nodata_sty} />
                    <View style={styles.button}>
                        <Text style={styles.button_txt}>No Message Found</Text>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={messageList}
                    renderItem={({ item, index }) => (
                        <MessageList item={item} index={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
        fontFamily: FONTS.Inter.medium,
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
export default Message;
