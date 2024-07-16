//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import NavigationService from '../../Services/Navigation';
import { AppButton, AppTextInput, Icon, Picker } from 'react-native-basic-elements';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import HomeService from '../../Services/HomeServises';
import AuthService from '../../Services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from '../../Redux/reducer/User';

const { height, width } = Dimensions.get('screen');

const MyProfile = () => {
    const { userData } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const [DateData, setDateData] = useState('');
    const [Date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [ProfileData, setProfileData] = useState('');
    const [useName, setuseName] = useState('');
    const [mobileno, setmobileno] = useState('');
    const [Satate, setSatate] = useState([]);
    const [PickSatate, setPickSatate] = useState('');
    const [district, setdistrict] = useState([]);
    const [pickdistrict, setpickdistrict] = useState('');
    const [city, setcity] = useState('');
    const [pinCode, setpinCode] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const DatehandleConfirm = (date) => {
        console.log('dateeeeeeee', moment(date).format('YYYY-MM-DD'));
        setDate(date);
        hideDatePicker();
    };

    useEffect(() => {
        fatchuser_profile();
        getState_list();
    }, []);

    const fatchuser_profile = async () => {
        setLoading(true); // Start loading
        HomeService.getUserProfile()
            .then((res) => {
                if (res && res.status == true) {
                    setProfileData(res.data);
                    setDateData(res.data.joing_date);
                    setuseName(res.data.full_name);
                    setmobileno(res.data.phone);
                    setcity(res.data.city);
                    setpinCode(res.data.pin_code);
                    setPickSatate(res.data.state_id);
                    setpickdistrict(res.data.district_id);
                    getDist_list(res.data.state_id);
                }
                setLoading(false); // Stop loading
            })
            .catch((err) => {
                setLoading(false); // Stop loading
            });
    };

    const getState_list = async () => {
        HomeService.fatchState_list()
            .then((res) => {
                if (res && res.success == true) {
                    setSatate(res.data);
                }
            })
            .catch((err) => {

            });
    };

    const getDist_list = async (sId) => {
        let data = {
            "state_id": sId
        };
        HomeService.fatchDist_list(data)
            .then((res) => {
                if (res && res.status == true) {
                    setdistrict(res.data);
                }
            })
            .catch((err) => {
                console.log('diserrrrrrrrrrrrrrrrrrr', err);
            });
    };


    const setProfile = async () => {    
        let data = {
            'name': useName,
            'phone': mobileno,
            'city': city,
            'state_id': PickSatate,
            'district_id': pickdistrict,
            'pin_code': pinCode
        };
        console.log('putdataaaaaaa', data);
        setBtnLoader(true); 
        try {
            const res = await HomeService.updateProfile(data);
            
            if (res && res.status) {
                dispatch(setuser({ ...userData, ...res.data }));
                AuthService.setAccount({ ...userData, ...res.data });
                Toast.show('Profile Update successfully', Toast.SHORT);
            } else {
                Toast.show('Failed to update profile', Toast.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show('Error updating profile', Toast.SHORT);
        } finally {
            setBtnLoader(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>My Profile</Text>
                    </View>
                </View>
            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.buttonColor} style={{ marginTop: height / 3 }} />
                ) : (
                    <View style={{ marginHorizontal: moderateScale(15), marginTop: moderateScale(20), marginBottom: moderateScale(20) }}>
                        <Text style={styles.besic_txt}>Basic Profile</Text>
                        <View style={styles.ref_view}>
                            <Text style={styles.ref_code_txt}>Referral Code : </Text>
                            <View style={{
                                padding: moderateScale(7),
                                backgroundColor: Colors.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: moderateScale(25)
                            }}>
                                <Text style={styles.ref_txt}>{ProfileData.user_referral_code}</Text>
                            </View>
                        </View>
                        <Text style={styles.Joining_txt}>Joining Date </Text>

                        <Pressable onPress={showDatePicker}
                            style={{
                                ...styles.profile_input_sty
                            }}>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={val => {
                                    DatehandleConfirm(val);
                                    setDateData(val);
                                }}
                                onCancel={hideDatePicker}
                            />
                            <Pressable onPress={showDatePicker}>
                                <Text
                                    style={{
                                        color: Colors.black,
                                        fontFamily: FONTS.medium,
                                        fontSize: moderateScale(12)
                                    }}>
                                    {!DateData == '' ? moment(DateData).format('L') : 'YYYY/MM/DD'}
                                </Text>
                            </Pressable>

                            <TouchableOpacity onPress={showDatePicker}>
                                <Image source={require('../../assets/images/calendar.png')}
                                    style={{ height: moderateScale(25), width: moderateScale(25), tintColor: '#999' }}
                                />
                            </TouchableOpacity>

                        </Pressable>

                        <Text style={styles.input_title_txt}>Full Name<Text style={styles.star_sty}> *</Text></Text>
                        <AppTextInput
                            placeholder='Full Name'
                            inputContainerStyle={{
                                borderRadius: moderateScale(5),
                                paddingHorizontal: moderateScale(7),
                                height: moderateScale(45),
                                backgroundColor: Colors.secondaryFont
                            }}
                            mainContainerStyle={{
                                marginTop: moderateScale(3)
                            }}
                            value={useName}
                            onChangeText={(val) => setuseName(val)}
                        />

                        <Text style={styles.input_title_txt}>Mobile Number<Text style={styles.star_sty}> *</Text></Text>
                        <AppTextInput
                            maxLength={10}
                            placeholder='Mobile Number'
                            inputContainerStyle={{
                                borderRadius: moderateScale(5),
                                paddingHorizontal: moderateScale(7),
                                height: moderateScale(45),
                                backgroundColor: Colors.secondaryFont
                            }}
                            mainContainerStyle={{
                                marginTop: moderateScale(3)
                            }}
                            value={mobileno}
                            onChangeText={(val) => setmobileno(val)}
                        />
                        <Text style={{ ...styles.besic_txt, marginTop: moderateScale(15) }}>Address Information</Text>

                        <Text style={styles.input_title_txt}>State</Text>
                        <Picker
                            labelKey="name"
                            valueKey="id"
                            placeholder="Select State"
                            options={Satate}
                            textStyle={{
                                fontSize: moderateScale(14),
                                fontFamily: FONTS.regular
                            }}
                            containerStyle={{
                                backgroundColor: Colors.secondaryFont,
                                height: moderateScale(45),
                                borderRadius: moderateScale(6)
                            }}
                            selectedValue={PickSatate}
                            onValueChange={(val) => { setPickSatate(val), getDist_list(val) }}
                        />

                        <Text style={styles.input_title_txt}>District</Text>
                        <Picker
                            labelKey="district_name"
                            valueKey="id"
                            placeholder="Select District"
                            options={district}
                            textStyle={{
                                fontSize: moderateScale(14),
                                fontFamily: FONTS.regular
                            }}
                            containerStyle={{
                                backgroundColor: Colors.secondaryFont,
                                height: moderateScale(45),
                                borderRadius: moderateScale(6)
                            }}
                            selectedValue={pickdistrict}
                            onValueChange={(val) => {
                                setpickdistrict(val);
                            }}
                        />

                        <Text style={styles.input_title_txt}>City/Village</Text>
                        <AppTextInput
                            placeholder='Enter City/Village'
                            inputContainerStyle={{
                                borderRadius: moderateScale(5),
                                paddingHorizontal: moderateScale(7),
                                height: moderateScale(45),
                                backgroundColor: Colors.secondaryFont
                            }}
                            mainContainerStyle={{
                                marginTop: moderateScale(3)
                            }}
                            value={city}
                            onChangeText={(val) => setcity(val)}
                        />
                        <Text style={styles.input_title_txt}>Pin Code</Text>
                        <AppTextInput
                            placeholder='pin Code'
                            inputContainerStyle={{
                                borderRadius: moderateScale(5),
                                paddingHorizontal: moderateScale(7),
                                height: moderateScale(45),
                                backgroundColor: Colors.secondaryFont
                            }}
                            mainContainerStyle={{
                                marginTop: moderateScale(3)
                            }}
                            value={pinCode}
                            onChangeText={(val) => setpinCode(val)}
                            keyboardType='numeric'
                        />

                        <AppButton
                            title="Update Profile"
                            style={styles.button}
                            textStyle={styles.button_txt}
                            onPress={() => setProfile()}
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
                    </View>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cardColor
    },
    top_view: {
        backgroundColor: Colors.background,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    besic_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        color: Colors.black,
    },
    ref_view: {
        flexDirection: 'row',
        marginTop: moderateScale(15),
        alignItems: 'center'
    },
    ref_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        color: Colors.secondaryFont,
    },
    ref_code_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(15),
        color: Colors.black,
    },
    Joining_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(13),
        color: Colors.black,
        marginTop: moderateScale(15)
    },
    profile_input_sty: {
        borderWidth: 1,
        borderRadius: moderateScale(7),
        borderColor: Colors.grey,
        backgroundColor: Colors.secondaryFont,
        paddingHorizontal: moderateScale(10),
        height: moderateScale(45),
        width: width - moderateScale(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(7)
    },
    input_title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(13),
        marginTop: moderateScale(15),
        color: Colors.black
    },
    star_sty: {
        color: '#FE0505',
        fontSize: moderateScale(16),
    },
    button: {
        height: responsiveWidth(13),
        backgroundColor: Colors.buttonColor,
        marginTop: responsiveWidth(15),
        marginBottom: responsiveWidth(4),
        width: width - moderateScale(30),
        alignSelf: 'center'
    },
    button_txt: {
        color: Colors.secondaryFont,
        fontFamily: FONTS.semibold,
        fontSize: responsiveFontSize(2.5)
    }
});

//make this component available to the app
export { MyProfile };
