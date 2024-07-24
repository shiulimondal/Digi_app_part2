import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';

const { height, width } = Dimensions.get('screen');

const AboutUsCard = ({ item, index }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View key={index} style={styles.container}>
            <Text style={styles.heading_txt}>{index + 1}.<Text>{' '}{item.title}</Text></Text>
            <Image source={{ uri: item.image_path }} style={styles.img_sty} />
            <Text numberOfLines={expanded ? undefined : 4} style={styles.title_txt}>{item.description}</Text>
            <Pressable onPress={toggleExpand}>
                <Text style={styles.toggle_txt}>{expanded ? 'See Less' : 'See More'}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginBottom: moderateScale(20),
    },
    img_sty: {
        height: moderateScale(170),
        width: width - moderateScale(30),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    heading_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        color: Colors.buttonColor,
    },
    title_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(12),
        color: Colors.black,
    },
    toggle_txt: {
        fontFamily:FONTS.Inter.medium,
        fontSize: moderateScale(12),
        color: Colors.buttonColor,
        marginTop: moderateScale(5),
    },
});

export default AboutUsCard;
