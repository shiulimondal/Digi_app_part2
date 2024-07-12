import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Colors } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/Header/HomeHeader';
import { moderateScale } from '../../../Constants/PixelRatio';
import { Icon } from 'react-native-basic-elements';
import { FONTS } from '../../../Constants/Fonts';
import CategoryListCard from '../../../Components/HomeCard/CategoryListCard';

const CategoryScreen = ({ navigation }) => {
    
  const categoryData = [
    {
      cat_logo: require('../../../assets/images/wedding.png'),
      title: 'Marriage'
    },
    {
      cat_logo: require('../../../assets/images/job.png'),
      title: 'Job'
    },
    {
      cat_logo: require('../../../assets/images/buy.png'),
      title: 'Buy Sell & Rent'
    },
    {
      cat_logo: require('../../../assets/images/education.png'),
      title: 'Education'
    },
    {
      cat_logo: require('../../../assets/images/mechanic.png'),
      title: 'Mechanic'
    },
    {
      cat_logo: require('../../../assets/images/driver.png'),
      title: 'Driver & Operator'
    },
    {
      cat_logo: require('../../../assets/images/buildings.png'),
      title: 'House & Building'
    },
    {
      cat_logo: require('../../../assets/images/language.png'),
      title: 'Language Learning Course'
    },
  ];

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
            <Text style={styles.header_txt}>Which category you need</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={categoryData}
        renderItem={({ item, index }) => (
          <CategoryListCard item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

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
  }
});

export default CategoryScreen;
