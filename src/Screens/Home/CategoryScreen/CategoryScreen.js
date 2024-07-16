import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { Colors } from '../../../Constants/Colors';
import HomeHeader from '../../../Components/Header/HomeHeader';
import { moderateScale } from '../../../Constants/PixelRatio';
import { Icon } from 'react-native-basic-elements';
import { FONTS } from '../../../Constants/Fonts';
import CategoryListCard from '../../../Components/HomeCard/CategoryListCard';
import HomeService from '../../../Services/HomeServises';


const { height, width } = Dimensions.get('screen');
const CategoryScreen = ({ navigation }) => {

  const [categoryData, setcategoryData] = useState('')
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fatchCategory();
  }, [])
  const fatchCategory = async () => {
    setLoading(true)
    HomeService.getCategoryData()
      .then((res) => {
        if (res && res.success == true) {
          console.log('catttttttttttttttttttttttt',res.data);
          setLoading(false)
          setcategoryData(res.data)
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

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
      {loading ? <FlatList showsHorizontalScrollIndicator={false} data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={() => {
          return (
            <View style={{
              height: moderateScale(70),
              width: width,
              alignItems: 'center',
              backgroundColor: 'rgba(95,37,158,0.1)',
              alignSelf: 'center',
              marginTop: moderateScale(7),
            }}>
            </View>
          )
        }}
      />
        :
        <FlatList
          data={categoryData}
          renderItem={({ item, index }) => (
            <CategoryListCard item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      }

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
