// import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import moment from 'moment';

// create a component
const MessageList = ({ item, index }) => {
    const [showReply, setShowReply] = useState(false);
    const toggleReply = () => {
        setShowReply(prevShowReply => !prevShowReply);
    };


    return (
        <View index={index} style={styles.container}>
            <View style={styles.main_view}>
                <View>
                    <Text style={styles.message_txt}>{item.question}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(10) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='clock' type='Feather' color={Colors.grey} />
                            <Text style={styles.time_txt}>{moment(item.date).format('DD-MMM-YYYY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: moderateScale(15) }}>
                            <Icon name='message-text-outline' type='MaterialCommunityIcon' color={Colors.grey} />
                            {
                                item.status == 0?
                                <Text style={styles.time_txt}>0</Text>
                                :
                                <Text style={styles.time_txt}>{item.status}</Text>
                            }
                           
                        </View>
                    </View>

                </View>
                <Pressable onPress={toggleReply}>
                    {showReply ? (
                        <Icon name='down' type='AntDesign' />
                    ) : (
                        <Icon name='right' type='AntDesign' />
                    )}
                </Pressable>
            </View>
            <View style={{
                marginTop: moderateScale(10)
            }}>
                {showReply && (
                    <Text style={styles.reply_txt}>{item.answer}</Text>
                )}
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(17),
        marginTop: moderateScale(7),
        padding: moderateScale(10),
        borderRadius: moderateScale(5),
        // borderWidth: moderateScale(0.3),
        // borderColor: Colors.grey
    },
    main_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.black,
        maxWidth:'95%'
    },
    time_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        marginLeft: moderateScale(7),
        color: Colors.black,
        textAlign: 'center'
    },
    reply_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(13),
        color: Colors.black,
        marginTop: moderateScale(7)
    }
});

// make this component available to the app
export default MessageList;
