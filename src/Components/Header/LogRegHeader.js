import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { moderateScale } from '../../Constants/PixelRatio';
import { Icon, StatusBar } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';

const LogRegHeader = () => {
  return (
    <View>
      <StatusBar backgroundColor={Colors.buttonColor} barStyle='light-content' />
      <View style={styles.main_view}>

          <Image  source={require('../../assets/images/digilogo.png')} style={styles.bar_img}/>
        <Text style={styles.header_txt}>Welcome to Digi Help</Text>
      
          <Icon name='bell' type='FontAwesome5' size={22} color={Colors.buttonColor} style={{marginRight:20}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_view: {
    paddingBottom: moderateScale(7),
    height: moderateScale(50),
    width: '100%',
    backgroundColor: Colors.header,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(5),
  },
  header_txt: {
    fontFamily: FONTS.Inter.semibold,
    fontSize: responsiveHeight(2),
    color: Colors.secondaryFont,
    marginRight:moderateScale(15)
  },
  bar_img:{
    height:moderateScale(60),
    width:moderateScale(70),
    resizeMode:'contain'
  }
});

export default LogRegHeader;
