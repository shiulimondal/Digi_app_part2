import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import Header from "../../Components/Header/Header";
import { Colors } from "../../Constants/Colors";
import { AppButton } from "react-native-basic-elements";
import Toast from "react-native-simple-toast";
import { FONTS } from "../../Constants/Fonts";
import AuthService from "../../Services/Auth";
import NavigationService from "../../Services/Navigation";
import HttpClient from "../../Utils/HttpClient";


const Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const setSendOtp = async () => {
    const mobilevalidate = (text) => {
      const reg = /^[0]?[6789]\d{9}$/;
      return reg.test(text);
    };

    if (phone === "") {
      Toast.show("Enter your mobile number", Toast.SHORT, Toast.BOTTOM);
      return;
    }

    if (!mobilevalidate(phone)) {
      Toast.show("Enter Valid mobile number", Toast.SHORT, Toast.BOTTOM);
      return;
    }

    let data = {
      "phone": phone
    };
    setBtnLoader(true);
    AuthService.getSendOtp(data)
      .then((res) => {
        setBtnLoader(false);
        if (res.status === true) {
          NavigationService.navigate("LoginOTP",{PhNumberData:res});
        } else {
          Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        Toast.show("Error sending OTP", Toast.SHORT, Toast.BOTTOM);
        setBtnLoader(false);
      });
  };

 

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.log_img}
        />
        <Text style={styles.title_txt}>Please Enter your Mobile Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={10}
            value={phone}
            cursorColor={Colors.primary}
            onChangeText={(txt) => setPhone(txt)}
            selectionColor={"#ccc"}
            placeholder="Enter Phone Number"
            placeholderTextColor={Colors.grey}
            style={styles.inputfild}
            keyboardType="numeric"
          />
        </View>
        <AppButton
          title="Verify"
          style={styles.button}
          textStyle={styles.button_txt}
          onPress={setSendOtp}
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
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backgroundColor
    },
    log_img: {
      height: responsiveScreenHeight(30),
      width: responsiveWidth(62),
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: responsiveHeight(5)
    },
    title_txt: {
      color: Colors.black,
      marginHorizontal: 15,
      fontSize:responsiveFontSize(4.2),
      fontFamily:FONTS.medium
    },
    inputContainer: {
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      height: responsiveWidth(12.8),
      borderColor: '#ccc',
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 15,
      marginTop:responsiveHeight(2)
  
    },
    inputfild: {
      paddingLeft: 16,
      height: responsiveHeight(6.5),
      borderColor: "#ccc",
      width: "80%",
      color: Colors.black,
      fontFamily:FONTS.medium,
      fontSize: responsiveFontSize(2)
    },
    button: {
      height: responsiveWidth(13),
      backgroundColor: Colors.buttonColor,
      marginTop: responsiveWidth(10),
      marginBottom: responsiveWidth(6),
    
    },
    button_txt:{
      color:Colors.secondaryFont,
      fontFamily:FONTS.semibold,
      fontSize:responsiveFontSize(2.5)
    }
  });