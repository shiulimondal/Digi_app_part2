// Import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { AppButton } from 'react-native-basic-elements';
import { useRoute } from '@react-navigation/native';
import NavigationService from '../../Services/Navigation';
import AuthService from '../../Services/Auth';
import Header from '../../Components/Header/Header';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FONTS } from '../../Constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import Toast from "react-native-simple-toast";
// import RNOtpVerify, { getHash, removeListener, startOtpListener } from 'react-native-otp-verify';



// Create a component
const LoginOTP = ({ navigation }) => {
  const { login_status } = useSelector(state => state.User);
  const route = useRoute();
  const dispatch = useDispatch()
  const MobileNumber = route.params.PhNumberData;
  const [phoneOtp, setPhoneOtp] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);

    // useEffect(() => {
    //   getHash().then(hash => {
    //     console.log('hashhhhhhhhhhhhh',hash);
        
    //   }).catch(console.log);
    
    //   startOtpListener(message => {
    //     console.log('juuuuuuuuuuuuuuu',message);
        
    //     // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
    //     // const otp = /(\d{4})/g.exec(message)[1];
    //     // console.log('otppppppppppppppppppppppp',otp);
        
    //   });
    //   return () => removeListener();
    // }, []);


  const setOtpVerify = () => {
    let data = {
      "phone": MobileNumber?.phone,
      "otp": phoneOtp
    };
    console.log('putdata========', data);
    setBtnLoader(true);
    AuthService.getVeriftOtp(data)

      .then((res) => {
        console.log("Response=====================:", res);
        setBtnLoader(false);
        if (res.status === true) {
          if (res.account_verified === false) {
            NavigationService.navigate('UserRegister', { PhNumber: res.data });
          } else {
            NavigationService.navigate('UserLogin', { PhNumber: res.data });
          }
        } else {
          Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
        }

      })
      .catch((err) => {
        console.error("Error============================:", err);
        setBtnLoader(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/otp_img.png')} style={styles.log_img} />
        <Text style={styles.title_txt}>OTP We </Text>
        <Text style={styles.title_txt}>
          Are Sending To You
          <Text style={{ color: Colors.primaryFont }}> {MobileNumber?.phone}</Text>
        </Text>

        <View style={styles.inputContainer}>
          <OTPTextInput
            inputCount={4}
            handleTextChange={(text) => setPhoneOtp(text)}
            defaultValue={phoneOtp}
            textInputStyle={{
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 4,
              backgroundColor: '#efe9f5',
              elevation: 3,
              width: moderateScale(55),
              height: moderateScale(55)
            }}
            offTintColor={Colors.buttonColor}
          />
        </View>
{
  phoneOtp.length === 4 ? 
  <AppButton
          title="Submit"
          style={{
            ...styles.button,
            backgroundColor:Colors.buttonColor
          }}
          textStyle={styles.button_txt}
          onPress={() => setOtpVerify()}
          loader={
            btnLoader
              ? {
                position: "right",
                color: "#fff",
                size: "small",
              }
              : null
          }
          disabled={btnLoader}
        />
        :
        <AppButton
          title="Submit"
          style={{
            ...styles.button,
            backgroundColor:Colors.grey
          }}
          textStyle={styles.button_txt}
          // onPress={() => setOtpVerify()}
          
        />
}
        
      </ScrollView>
    </View>
  );
};

// Make this component available to the app
export default LoginOTP;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backgroundColor
    },
    log_img: {
      height: responsiveHeight(30),
      width: responsiveWidth(62),
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: responsiveHeight(5)
    },
    title_txt: {
      color: Colors.black,
      marginHorizontal: moderateScale(20),
      fontSize: responsiveFontSize(2.6),
      fontFamily: FONTS.Inter.medium
    },
    inputContainer: {
      backgroundColor: "white",
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      fontFamily: FONTS.Inter.regular,
      marginTop: responsiveHeight(2),
      borderColor: Colors.buttonColor
    },
    button: {
      height: responsiveWidth(13),
      marginTop: responsiveWidth(6),
      marginBottom: responsiveWidth(6),
    },
    button_txt: {
      color: Colors.secondaryFont,
      fontFamily: FONTS.Inter.semibold,
      fontSize: responsiveFontSize(2.5)
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: (10),
      padding: (20),
      borderWidth: 2,
      alignItems: 'center'
    },
    modal_massege: {
      fontFamily: FONTS.Inter.regular,
      fontSize: responsiveFontSize(2),
      color: Colors.black,
      marginTop: responsiveHeight(2)
    },
    button_sty: {
      backgroundColor: Colors.buttonColor,
      borderRadius: 20,
      height: (30),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: responsiveWidth(20),
      marginTop: responsiveHeight(4)
    },
    button_txt_sty: {
      fontFamily: FONTS.Inter.bold,
      fontSize: (13),
      alignSelf: 'center',
      color: '#fff'
    },
  });
