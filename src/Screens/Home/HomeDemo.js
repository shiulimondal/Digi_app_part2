import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import CategoryCard from '../../Components/HomeCard/CategoryCard';
import { useSelector } from 'react-redux';
import HomeService from '../../Services/HomeServises';
import { useSharedValue } from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');

const HomeDemo = ({ navigation }) => {
  const { userData } = useSelector(state => state.User);
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = moderateScale(110);

  const [bgColor, setBgColor] = useState([
    { boxBg: "#B25EF3" },
    { boxBg: "#FF406E" },
    { boxBg: "#7BF55C" },
    { boxBg: "#FFD64B" },
    { boxBg: "#FF6C4B" },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const res = await HomeService.getCategoryData();
      setLoading(false);
      if (res && res.success === true) {
        const updatedCategoryData = res.data.map((category, index) => ({
          ...category,
          boxBg: bgColor[index % bgColor.length].boxBg,
        }));
        setCategoryData(updatedCategoryData);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    let interval;
    if (categoryData && categoryData.length > 0) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= categoryData.length * 2) {
          nextIndex = 0;
          flatListRef.current.scrollToOffset({ offset: 0, animated: false });
        } else {
          flatListRef.current.scrollToOffset({ offset: nextIndex * screenWidth, animated: true });
        }
        setCurrentIndex(nextIndex);
      }, 2000); // Adjust the interval time as needed (e.g., 2000 ms for 2 seconds)

      return () => clearInterval(interval);
    }
  }, [currentIndex, categoryData]);

  const scrollX = useSharedValue(0);

  const onScroll = e => {
    scrollX.value = e.nativeEvent.contentOffset.x;
  };

  const onMomentumScrollEnd = () => {
    if (currentIndex >= categoryData.length) {
      flatListRef.current.scrollToOffset({
        offset: (currentIndex - categoryData.length) * screenWidth,
        animated: false,
      });
      setCurrentIndex(currentIndex - categoryData.length);
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top_view}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.userInitialContainer}>
              <Text style={{ ...styles.user_name, color: Colors.buttonColor, fontFamily: FONTS.Inter.bold }}>
                {userData?.first_name?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={{ ...styles.user_name, marginLeft: moderateScale(10) }}>
              {userData.full_name}
            </Text>
          </View>
          <Text style={styles.user_id}> ID - <Text>{userData.user_referral_code}</Text></Text>
        </View>
        <View style={{marginTop:moderateScale(10)}}>
          <FlatList
            ref={flatListRef}
            data={[...categoryData, ...categoryData]} 
            horizontal
            style={{ paddingLeft:15}}
            bounces={false}
            onScroll={onScroll}
            scrollEventThrottle={18}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <CategoryCard item={item} key={index} />
            )}
            onMomentumScrollEnd={onMomentumScrollEnd}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_view: {
    backgroundColor: Colors.buttonColor,
    marginHorizontal: moderateScale(10),
    padding: moderateScale(5),
    marginTop: moderateScale(7),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  userInitialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: moderateScale(12),
    height: moderateScale(22),
    width: moderateScale(22),
  },
  user_name: {
    fontFamily: FONTS.Inter.semibold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13),
  },
  user_id: {
    fontFamily: FONTS.Inter.bold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13),
  },
});

export default HomeDemo;
