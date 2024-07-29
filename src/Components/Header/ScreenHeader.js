import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { moderateScale } from '../../Constants/PixelRatio';
import { Icon, StatusBar } from 'react-native-basic-elements';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FONTS } from '../../Constants/Fonts';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import NavigationService from '../../Services/Navigation';



const ScreenHeader = () => {
  const navigation = useNavigation();
  const progress = useSharedValue(0);


  const navigateToNotification = () => {
    navigation.navigate('NotificationScreen');
  };
  return (
    <View>
      <StatusBar backgroundColor={Colors.buttonColor} barStyle='light-content' />
      <View style={styles.main_view}>
        <View >
          <Pressable onPress={() => NavigationService.goBack()}>
            <Icon name='chevron-left' type='FontAwesome5' size={21} color={'#fff'}/>
          </Pressable>
        </View>
        <Text style={styles.header_txt}>Welcome to Digi Help</Text>
        <Pressable onPress={() => {
          progress.value = withTiming(1, {}, (isFinished) => {
            if (isFinished) {
              runOnJS(navigateToNotification)();
            }
          });
        }}>
          <Icon name='bell' type='FontAwesome5' size={22} color={Colors.secondaryFont} />
        </Pressable>
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
    paddingHorizontal: moderateScale(15),
  },
  header_txt: {
    fontFamily: FONTS.Inter.semibold,
    fontSize: responsiveHeight(2),
    color: Colors.secondaryFont,
  },
});

export default ScreenHeader;
