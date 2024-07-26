//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '../../Components/Header/Header';
import { Icon } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import WebView from 'react-native-webview';


// create a component
const TermsAndConditions = () => {
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Terms and Conditions</Text>
                    </View>
                </View>
            </View>
            <WebView source={{ uri: 'https://digihelpapp.com/term-and-conditions' }} style={{ flex: 1 }} />
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
});

//make this component available to the app
export default TermsAndConditions;
