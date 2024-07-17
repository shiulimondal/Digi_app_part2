//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import HomeHeader from '../../../Components/Header/HomeHeader';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { moderateScale } from '../../../Constants/PixelRatio';
import NavigationService from '../../../Services/Navigation';
import { AppButton, AppTextInput, Icon, Picker } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('screen');
// create a component
const SubCatFrom = () => {
    const [dropdownValue, setDropdownValue] = useState('');
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
                        <Text style={styles.header_txt}>My Business Account</Text>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginHorizontal: moderateScale(15),
                    marginTop: moderateScale(10),
                    marginBottom: moderateScale(20)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: moderateScale(15)
                    }}>
                        <View style={styles.img_view}>
                            <Image source={require('../../../assets/images/blankimg.png')} style={styles.upload_img} />
                        </View>
                        <TouchableOpacity
                            style={styles.reg_button}>
                            <Text style={styles.button_reg_txt}>Upload Image</Text>

                        </TouchableOpacity>
                    </View>
                    <Text style={styles.input_title_txt}>Full Name</Text>
                    <AppTextInput
                        placeholder='Full Name'
                        inputContainerStyle={{
                            borderRadius: moderateScale(5),
                            paddingHorizontal: moderateScale(7)
                        }}
                        mainContainerStyle={{
                            marginTop: moderateScale(5)
                        }}
                    // value={useName}
                    // onChangeText={(val) => setuseName(val)}
                    />

                    <Text style={styles.input_title_txt}>Contact Number</Text>
                    <AppTextInput
                        placeholder='Contact Number'
                        inputContainerStyle={{
                            borderRadius: moderateScale(5),
                            paddingHorizontal: moderateScale(7)
                        }}
                        mainContainerStyle={{
                            marginTop: moderateScale(5)
                        }}
                    // value={useName}
                    // onChangeText={(val) => setuseName(val)}
                    />
                    <View style={styles.picker_view}>
                        <View>
                            <Text style={styles.input_title_txt}>Age</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View>
                            <Text style={styles.input_title_txt}>Religion</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.picker_view}>
                        <View>
                            <Text style={styles.input_title_txt}>State</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View>
                            <Text style={styles.input_title_txt}>District</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.picker_view}>
                        <View>
                            <Text style={styles.input_title_txt}>City/ Village </Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View>
                            <Text style={styles.input_title_txt}>Annual Income</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.picker_view}>
                        <View>
                            <Text style={styles.input_title_txt}>Height</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View>
                            <Text style={styles.input_title_txt}>Marital Status</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.picker_view}>
                        <View>
                            <Text style={styles.input_title_txt}>Qualifications</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View>
                            <Text style={styles.input_title_txt}>Occupation</Text>
                            <Picker
                                placeholder="Select"
                                options={[
                                    {
                                        label: 'Item 1',
                                        value: 'item1'
                                    },
                                    {
                                        label: 'Item 2',
                                        value: 'item2'
                                    },
                                ]}
                                textStyle={{
                                    fontSize: moderateScale(14),
                                    fontFamily: FONTS.regular
                                }}
                                containerStyle={{
                                    backgroundColor: Colors.secondaryFont,
                                    height: moderateScale(48),
                                    borderRadius: moderateScale(6),
                                    width: moderateScale(150)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>
                    <View style={styles.picker_view}>
                        <Text style={styles.input_title_txt}>Write something about yourself</Text>
                        <Text style={styles.input_title_txt}>(Optional)</Text>
                    </View>
                    <AppTextInput
                        placeholder='Maximum up to 40 word'
                        inputContainerStyle={{
                            borderRadius: moderateScale(5),
                            paddingHorizontal: moderateScale(7)
                        }}
                        mainContainerStyle={{
                            marginTop: moderateScale(5)
                        }}
                        numberOfLines={5}
                        textAlignVertical='center'
                        textAlign='center'
                    // value={useName}
                    // onChangeText={(val) => setuseName(val)}
                    />

                    <AppButton
                        title="SUBMIT"
                        style={styles.button}
                        textStyle={styles.button_txt}
                    // loader={
                    //     btnLoader
                    //         ? {
                    //             position: "right",
                    //             color: "#fff",
                    //             size: "small",
                    //         }
                    //         : null
                    // }
                    // disabled={btnLoader}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
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
    img_view: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10),
        backgroundColor: Colors.secondaryFont,
        elevation: 2,
        height: moderateScale(95),
        width: moderateScale(95),
        borderRadius: moderateScale(7)
    },
    upload_img: {
        height: moderateScale(60),
        width: moderateScale(60)
    },
    reg_button: {
        height: moderateScale(40),
        width: moderateScale(100),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: moderateScale(20)
    },
    button_reg_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
    input_title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),
        marginTop: moderateScale(15),
        color: Colors.black
    },
    picker_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(7)
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
export default SubCatFrom;
