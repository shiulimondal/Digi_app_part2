import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';
import NavigationService from '../../Services/Navigation';

const UserDataCard = ({ item, index }) => {
  const handlePress = () => {
    NavigationService.navigate(item.handleClick);
  };

  return (
    <TouchableOpacity key={index} onPress={handlePress}>
      <View style={styles.container}>
        <Image source={item.img} style={styles.logo_sty} />
        <Text style={styles.title_txt}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#5230DC",
    elevation: moderateScale(2),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
    width: moderateScale(160),
    height: moderateScale(100)
  },
  logo_sty: {
    height: moderateScale(40),
    width: moderateScale(40)
  },
  title_txt: {
    fontFamily: FONTS.Inter.semibold,
    fontSize: moderateScale(13),
    marginTop: moderateScale(7),
    color: Colors.secondaryFont
  }
});

export default UserDataCard;
