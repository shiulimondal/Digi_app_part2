import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Pressable, Image, ActivityIndicator, FlatList, Share, Alert } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { AppButton, Icon } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import CategoryCard from '../../Components/HomeCard/CategoryCard';
import Modal from "react-native-modal";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import UserDataCard from '../../Components/HomeCard/UserDataCard';
import { useSelector } from 'react-redux';
import NavigationService from '../../Services/Navigation';
import HomeService from '../../Services/HomeServises';
import YouTubeIframe from 'react-native-youtube-iframe';
import { useSharedValue } from 'react-native-reanimated';


const { height, width } = Dimensions.get('screen');
const Home = ({ navigation }) => {
  const { userData } = useSelector(state => state.User)
  const flatListRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryData, setcategoryData] = useState('')
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = moderateScale(110)
  const [videoLink, setVideoLink] = useState()


  const [bgColor, setBgColor] = useState([

    {
      boxBg: "#B25EF3"
    },
    {
      boxBg: "#FF406E"
    },
    {
      boxBg: "#7BF55C"
    },
    {
      boxBg: "#FFD64B"
    },
    {
      boxBg: "#FF6C4B"
    },
  ])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fatchCategory();
    getYoutubeLink();
  }, [])

  const fatchCategory = async () => {
    setLoading(true);
    try {
      const res = await HomeService.getCategoryData();
      setLoading(false);
      if (res && res.success === true) {
        const updatedCategoryData = res.data.map((category, index) => ({
          ...category,
          boxBg: bgColor[index % bgColor.length].boxBg
        }));
        setcategoryData(updatedCategoryData);
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
      }, 2000);

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

  const getYoutubeLink = async () => {
    try {
      const res = await HomeService.setbanneryoutubelink();
      if (res && res.success === true) {
        // console.log('videoooooooooooooooooooo', res.data);
        setVideoLink(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  const extractVideoId = (url) => {
    const match = url.match(/youtube\.com\/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  const videoId = videoLink ? extractVideoId(videoLink.video_link) : null;

  const UserData = [
    {
      img: require('../../assets/images/member.png'),
      title: 'My Member',
      handleClick: 'MyMember'
    },
    {
      img: require('../../assets/images/income.png'),
      title: 'My Income',
      handleClick: 'MyIncome'
    },
    {
      img: require('../../assets/images/funding.png'),
      title: 'Funding Details',
      handleClick: 'FundingDetails'
    },
    {
      img: require('../../assets/images/share.png'),
      title: 'Refer & Earn',
      handleClick: () => onShare()
    }
  ]

  const onShare = async () => {
    try {
      const message = `Check out this amazing app! Download This app. https://yourapp.link/${userData.user_referral_code}`;
      const result = await Share.share({
        message: message,
        title: 'Share This App',
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Share successful');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <View style={{
              backgroundColor: 'rgba(95,37,158,0.1)',
              height: moderateScale(40),
              width: width - moderateScale(20),
              borderRadius: moderateScale(10),
              alignSelf: 'center',
              marginTop: moderateScale(10)
            }}>
            </View>
          </View>
        ) :
          <View style={styles.top_view}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.background,
                borderRadius: moderateScale(12),
                height: moderateScale(22),
                width: moderateScale(22),
              }}>
                <Text style={{ ...styles.user_name, color: Colors.buttonColor, fontFamily: FONTS.Inter.bold }}>{userData?.first_name?.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={{
                ...styles.user_name,
                marginLeft: moderateScale(10)
              }}>{userData.full_name}</Text>
            </View>

            <Text style={styles.user_id}> ID - <Text>{userData.user_referral_code}</Text></Text>
          </View>
        }
        <View>
          {loading ? (
            <View style={{
              marginTop: moderateScale(10),
              paddingHorizontal: moderateScale(10)
            }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[...Array(4)].map((_, index) => (
                  <View
                    key={index}
                    style={styles.categoryloder}
                  ></View>
                ))}
              </ScrollView>
            </View>
          ) :
            <View style={{ marginTop: moderateScale(10) }}>
              <FlatList
                ref={flatListRef}
                data={[...categoryData, ...categoryData, ...categoryData]}
                horizontal
                style={{ paddingLeft: moderateScale(10), marginBottom: moderateScale(7) }}
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
          }
        </View>
        {
          loading ?
            <View style={styles.homeB_loder}></View>
            :
            <TouchableOpacity
              onPress={() => NavigationService.navigate('CategoryScreen')}
              style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/images/home_banner.png')} style={styles.home_banner} />
            </TouchableOpacity>
        }

        {
          loading ?
            <View style={{ ...styles.homeB_loder, height: moderateScale(220) }}></View>
            :
            <View style={styles.primary_view}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.primary_txt}>Refer commission will keep coming Life time</Text>
              </View>

              <View style={styles.secondary_view}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.primary_txt}>Your refer income (Upto 2 depth)</Text>
                  <Text style={styles.amount_txt}>₹ 2050</Text>
                </View>
                <View style={styles.button_view}>
                  <Pressable
                    onPress={() => NavigationService.navigate('IncomeStructure')}
                    style={styles.botton_sty}>
                    <Text style={styles.button_txt}>Income Structure</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => NavigationService.navigate('TransferMoney')}
                    style={styles.botton_sty}>
                    <Text style={styles.button_txt}>Withdraw Request</Text>
                  </Pressable>
                </View>
                <TouchableOpacity onPress={toggleModal} style={styles.end_view}>
                  <Text style={styles.Click_txt}>View Term & Condition for referral income</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.primary_txt, marginBottom: moderateScale(5), fontSize: moderateScale(11) }}>Click hare</Text>
                    <Image source={require('../../assets/images/homeclickr.png')} style={{
                      height: moderateScale(15),
                      width: moderateScale(20),
                      marginLeft: moderateScale(7)
                    }} />
                  </View>

                </TouchableOpacity>
              </View>
            </View>
        }


        {loading ? (
          <View style={{
            marginTop: moderateScale(-15),
            paddingHorizontal: moderateScale(10)
          }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {[...Array(4)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.categoryloder, width: moderateScale(156),
                    height: moderateScale(100), marginRight: moderateScale(8),
                  }}
                ></View>
              ))}
            </View>
          </View>
        ) :
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: moderateScale(10), justifyContent: 'space-between' }}>
            {UserData.map((item, index) => (
              <UserDataCard
                key={index}
                item={item}
                navigation={navigation}
                onPress={item.handleClick}
              />
            ))}

          </View>
        }

        {
          loading ?
            <View style={{ ...styles.homeB_loder, borderRadius: (0) }}></View>
            :
            <View style={styles.videoContainer}>

              <YouTubeIframe
                videoId={videoId}
                height={200}
                play={false}
              />
            </View>
        }
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modal_box_view}>
            <Text style={styles.modal_massege}>Referral income Instruction</Text>
            <Text style={styles.modal_text}>Your referral income is actually your affiliate
              income Unlimited referrals, unlimited
              commissions. Members referred by you will be
              considered your customers for life. You'll
              receive lifetime benefits from your referrals.
              Whenever your direct member pays for adding
              a profile or using services, you'll earn a 15%
              commission. Additionally, for depth 2 members,
              you'll receive a 5% commission.</Text>
          </View>

          <View style={{ ...styles.modal_box_view, marginTop: moderateScale(15) }}>
            <Text style={styles.modal_massege}>Something maintenance charge</Text>
            <Text style={styles.modal_text}>6% maintenance fee will be deducted from your
              income. while withdrawing money from your
              withdrawal amount</Text>
          </View>
          <AppButton
            shadow={true}
            title='Got It'
            textStyle={styles.modal_button_txt_sty}
            style={styles.modal_button_sty}
            onPress={() => setModalVisible(false)}

          />
        </View>
      </Modal>

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
    paddingHorizontal: moderateScale(10)
  },
  user_name: {
    fontFamily: FONTS.Inter.semibold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13),

  },
  user_id: {
    fontFamily: FONTS.Inter.bold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13)
  },
  category_view: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5)
  },
  home_banner: {
    resizeMode: 'contain',
    width: width - moderateScale(20),
    height: moderateScale(160)
  },
  homeB_loder: {
    width: width - moderateScale(20),
    height: moderateScale(160),
    backgroundColor: 'rgba(95,37,158,0.1)',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15)
  },
  primary_view: {
    backgroundColor: Colors.blue,
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(0),
    paddingBottom: moderateScale(0),
    marginTop: moderateScale(10)
  },
  primary_txt: {
    fontFamily: FONTS.Inter.medium,
    color: Colors.secondaryFont,
    marginBottom: moderateScale(10),
    fontSize: moderateScale(13)
  },
  secondary_view: {
    backgroundColor: Colors.buttonColor,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  amount_txt: {
    fontFamily: FONTS.Inter.semibold,
    color: Colors.secondaryFont,
    marginBottom: moderateScale(10),
    fontSize: moderateScale(16)
  },
  button_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(3)
  },
  botton_sty: {
    backgroundColor: '#06D001',
    width: moderateScale(147),
    height: moderateScale(35),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_txt: {
    fontFamily: FONTS.Inter.medium,
    fontSize: moderateScale(13),
    color: Colors.secondaryFont
  },
  end_view: {
    backgroundColor: '#2B26FD',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(15),
    alignItems: 'center',
    paddingTop: moderateScale(7),
    justifyContent: 'center'
  },
  Click_txt: {
    fontFamily: FONTS.Inter.medium,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13)
  },
  modal_box_view: {
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: moderateScale(10)
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: (10),
    padding: (20),
    borderWidth: 2,
    alignItems: 'center'
  },
  modal_massege: {
    fontFamily: FONTS.Inter.semibold,
    fontSize: moderateScale(16),
    color: Colors.black,
  },
  modal_text: {
    fontFamily: FONTS.regular,
    fontSize: moderateScale(13),
    color: Colors.black,
    textAlign: 'center',
    marginTop: moderateScale(10)
  },
  modal_button_sty: {
    backgroundColor: 'red',
    borderRadius: 20,
    height: moderateScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: responsiveWidth(20),
    marginTop: responsiveHeight(4)
  },
  modal_button_txt_sty: {
    fontFamily: FONTS.Inter.bold,
    fontSize: moderateScale(15),
    alignSelf: 'center',
    color: '#fff'
  },
  bottom_banner: {
    backgroundColor: Colors.buttonColor,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  top_txt: {
    fontFamily: FONTS.Inter.bold,
    fontSize: moderateScale(20),
    color: Colors.secondaryFont,
    textAlign: 'center'
  },
  categoryloder: {
    backgroundColor: 'rgba(95,37,158,0.1)',
    height: moderateScale(90),
    width: moderateScale(94),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginRight: moderateScale(7),
    marginBottom: moderateScale(15),
    paddingHorizontal: moderateScale(5)
  },
  bottombanner_sty: {
    height: moderateScale(170),
    width: width - moderateScale(20),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: moderateScale(1),
    marginBottom: moderateScale(10)
  },
  videoContainer: {
    height: moderateScale(170),
    width: width - moderateScale(20),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(30)
  },
  youtybeicon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    marginLeft: -25,
    marginTop: -25,
  },
});

export default Home;
