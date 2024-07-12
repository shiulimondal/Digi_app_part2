//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { FONTS } from '../../Constants/Fonts';
import { StatusBar } from 'react-native-basic-elements';



// create a component
const Header = () => {
    return (
        <View>
           <StatusBar
                backgroundColor={Colors.buttonColor}
                barStyle='light-content'
            />
            <View style={{ paddingBottom:10, height: 40, width: '100%', backgroundColor: Colors.header, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.header_txt}>Welcome to  Digi Help</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    header_txt: {
        fontFamily:FONTS.regular,
        fontSize: responsiveHeight(2),
        color: Colors.secondaryFont,
    }
});

//make this component available to the app
export default Header;
