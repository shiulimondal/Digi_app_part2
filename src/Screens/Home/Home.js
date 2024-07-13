import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Pressable,Image } from 'react-native';
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

const { height, width } = Dimensions.get('screen');
const Home = ({ navigation }) => {
  const {userData} = useSelector(state => state.User)
  console.log('userData==============',userData);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const categoryData = [
    {
      cat_logo: require('../../assets/images/wedding.png'),
      title: 'Marriage'
    },
    {
      cat_logo: require('../../assets/images/job.png'),
      title: 'Job'
    },
    {
      cat_logo: require('../../assets/images/buy.png'),
      title: 'Buy Sell & Rent'
    },
    {
      cat_logo: require('../../assets/images/education.png'),
      title: 'Education'
    },
    {
      cat_logo: require('../../assets/images/mechanic.png'),
      title: 'Mechanic'
    },
    {
      cat_logo: require('../../assets/images/driver.png'),
      title: 'Driver & Operator'
    },
    {
      cat_logo: require('../../assets/images/buildings.png'),
      title: 'House & Building'
    },
    // {
    //   cat_logo: require('../../assets/images/language.png'),
    //   title: 'Language Learning Course'
    // },
  ];

  const UserData = [
    {
      img: require('../../assets/images/member.png'),
      title: 'My Member'
    },
    {
      img: require('../../assets/images/income.png'),
      title: 'My Income'
    },
    {
      img: require('../../assets/images/funding.png'),
      title: 'Funding Details'
    },
    {
      img: require('../../assets/images/share.png'),
      title: 'Refer & Earn'
    }
  ]

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top_view}>
          <View style={{flexDirection:'row',alignItems:'center',}}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:Colors.background,
            borderRadius:moderateScale(30),
            height:moderateScale(28),
            width:moderateScale(28),
          }}>
            <Text style={{...styles.user_name,color:Colors.buttonColor}}>{userData?.first_name?.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={{...styles.user_name,
            marginLeft:moderateScale(7)
          }}>{userData.full_name}</Text>
          </View>
         
          <Text style={styles.user_id}> ID - <Text>{userData.user_referral_code}</Text></Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.category_view}>
              {
                categoryData.map((item, index) => (
                  <CategoryCard item={item} key={index} />
                ))
              }
            </View>
          </ScrollView>
        </View>
        <View style={{ height: moderateScale(180),}}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('CategoryScreen')}
            style={{ height: moderateScale(180), alignItems: 'center' }}>
            <Image source={require('../../assets/images/home_banner.png')} style={styles.home_banner} />
          </TouchableOpacity>
        </View>

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
              <Pressable style={styles.botton_sty}>
                <Text style={styles.button_txt}>Income Structure</Text>
              </Pressable>
              <Pressable style={styles.botton_sty}>
                <Text style={styles.button_txt}>Withdraw Request</Text>
              </Pressable>
            </View>

            <TouchableOpacity onPress={toggleModal} style={styles.end_view}>
              <Text style={styles.Click_txt}>View Term & Condition for referral income</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.primary_txt}>Click hare</Text>
                <Icon name='arrowright' type='AntDesign' color={Colors.secondaryFont} style={{ marginLeft: 10 }} />
              </View>

            </TouchableOpacity>

          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: moderateScale(15), justifyContent: 'space-between' }}>
          {
            UserData.map((item, index) => {
              return (
                <UserDataCard item={item} key={index} />
              )
            })
          }

        </View>

        <View style={styles.bottom_banner}>
          <Text style={styles.top_txt}>Know the seeciality of this app</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:moderateScale(15)}}>
          <Text style={styles.top_txt}>Passive</Text>
          <Image style={{height:moderateScale(35),width:moderateScale(50),marginHorizontal:moderateScale(20)}} 
          source={require('../../assets/images/youtube.png')}/>
          <Text style={styles.top_txt}>Income</Text>
          </View>
          <Text style={{...styles.top_txt,marginTop:moderateScale(10)}}>Know the seeciality of this app</Text>
        </View>

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
    marginHorizontal: moderateScale(15),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  user_name: {
    fontFamily: FONTS.semibold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13),
    
  },
  user_id: {
    fontFamily: FONTS.bold,
    color: Colors.secondaryFont,
    fontSize: moderateScale(13)
  },
  category_view: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20)
  },
  home_banner: {
    height: height - moderateScale(180),
    resizeMode: 'contain',
    width: width - moderateScale(10)
  },
  primary_view: {
    backgroundColor: Colors.blue,
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(0),
    paddingBottom: moderateScale(0)
  },
  primary_txt: {
    fontFamily: FONTS.semibold,
    color: Colors.secondaryFont,
    marginBottom: moderateScale(10),
    fontSize: moderateScale(13)
  },
  secondary_view: {
    backgroundColor: Colors.buttonColor,
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
  },
  amount_txt: {
    fontFamily: FONTS.semibold,
    color: Colors.secondaryFont,
    marginBottom: moderateScale(10),
    fontSize: moderateScale(15)
  },
  button_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(7)
  },
  botton_sty: {
    backgroundColor: '#06D001',
    width: moderateScale(140),
    height: moderateScale(40),
    borderRadius: moderateScale(13),
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_txt: {
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(14),
    color: Colors.secondaryFont
  },
  end_view: {
    backgroundColor: '#2B26FD',
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    marginTop: moderateScale(15),
    alignItems: 'center'
  },
  Click_txt: {
    fontFamily: FONTS.semibold,
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
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.bold,
    fontSize: moderateScale(15),
    alignSelf: 'center',
    color: '#fff'
  },
  bottom_banner: {
    backgroundColor: Colors.buttonColor,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  top_txt: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(20),
    color: Colors.secondaryFont,
    textAlign:'center'
  }
});

export default Home;
