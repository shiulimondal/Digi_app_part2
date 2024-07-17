//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, FlatList } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import NavigationService from '../../../Services/Navigation';
import { CheckBox, Icon, Picker } from 'react-native-basic-elements';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { useRoute } from '@react-navigation/native';
import SubCategoryListCard from '../../../Components/HomeCard/SubCategoryListCard';
import Modal from "react-native-modal";

// create a component
const ViewSubcategory = () => {
    const route = useRoute()
    const categoryName = route.params.cat_name;
    const [dropdownValue, setDropdownValue] = useState('');
    const [check, setCheck] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
                        <Text style={styles.header_txt}>{categoryName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.pickerTop_view}>
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
                        width: moderateScale(270),
                        borderRadius: moderateScale(25),
                        borderWidth: 0
                    }}
                    selectedValue={dropdownValue}
                    onValueChange={(val) => setDropdownValue(val)}
                />
                <View style={styles.filter_view}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Image source={require('../../../assets/images/filter.png')} style={styles.filter_sty} />
                    </TouchableOpacity>

                </View>
            </View>
            <FlatList
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => (
                    <SubCategoryListCard item={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Pressable onPress={() => NavigationService.navigate('SubCatFrom')} style={styles.add_button}>
                <Icon name='plus' type='AntDesign' size={32} />
            </Pressable>

            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={styles.address_wish_txt}>Address Wise </Text>
                        </View>

                        <Pressable onPress={() => setModalVisible(false)} style={{ alignItems: 'flex-end', }}>
                            <Icon name='close' type='AntDesign' color={'#FE0505'} />
                        </Pressable>


                    </View>
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
                            width: moderateScale(270)
                        }}
                        selectedValue={dropdownValue}
                        onValueChange={(val) => setDropdownValue(val)}
                    />

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
                            width: moderateScale(270)
                        }}
                        selectedValue={dropdownValue}
                        onValueChange={(val) => setDropdownValue(val)}
                    />



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
                            width: moderateScale(270)
                        }}
                        selectedValue={dropdownValue}
                        onValueChange={(val) => setDropdownValue(val)}
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
                                    width: moderateScale(120)
                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>

                        <View style={{ marginTop: moderateScale(25) }}>
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
                                    width: moderateScale(120),

                                }}
                                selectedValue={dropdownValue}
                                onValueChange={(val) => setDropdownValue(val)}
                            />
                        </View>
                    </View>

                    <Text style={{ ...styles.address_wish_txt, marginTop: moderateScale(10) }}>Distance  Wise </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(15) }}>
                        <CheckBox
                            checked={check}
                            onChange={(val) => setCheck(val)}
                            size={19}
                            containerStyle={{ borderWidth: 1 }}
                            inactiveColor={Colors.buttonColor}
                            activeColor={Colors.buttonColor}

                        />
                        <Text style={styles.distans_txt}>OKM to 50KM</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(15) }}>
                        <CheckBox
                            checked={check}
                            onChange={(val) => setCheck(val)}
                            size={19}
                            containerStyle={{ borderWidth: 1 }}
                            inactiveColor={Colors.buttonColor}
                            activeColor={Colors.buttonColor}

                        />
                        <Text style={styles.distans_txt}>51KM to 100KM</Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(15) }}>
                        <CheckBox
                            checked={check}
                            onChange={(val) => setCheck(val)}
                            size={19}
                            containerStyle={{ borderWidth: 1 }}
                            inactiveColor={Colors.buttonColor}
                            activeColor={Colors.buttonColor}

                        />
                        <Text style={styles.distans_txt}>101KM or Above</Text>
                    </View>

                    <View style={styles.modalbutton_view}>
                        <Pressable style={{ ...styles.modalbotton_sty, backgroundColor: '#888' }} >
                            <Text style={styles.modalbutton_txt}>Close</Text>
                        </Pressable>
                        <Pressable style={styles.modalbotton_sty}>
                            <Text style={styles.modalbutton_txt}>Search</Text>
                        </Pressable>
                    </View>

                </View>

            </Modal>

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
        backgroundColor: Colors.cardColor,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    pickerTop_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(7),
        alignItems: 'center',
        marginBottom: moderateScale(10),
        marginHorizontal: moderateScale(15)
    },
    picker_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(7),
        alignItems: 'center',
        marginBottom: moderateScale(10)
    },
    filter_view: {
        height: moderateScale(36),
        width: moderateScale(36),
        borderRadius: moderateScale(20),
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filter_sty: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: Colors.secondaryFont
    },
    add_button: {
        width: moderateScale(54),
        height: moderateScale(54),
        borderRadius: moderateScale(35),
        backgroundColor: '#FFBC0E',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: moderateScale(40),
        right: moderateScale(15)
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        borderWidth: 2,
    },
    input_title_txt: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(14),
        color: Colors.black,
        marginTop: moderateScale(7)
    },
    address_wish_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        textAlign: 'center',
        color: Colors.black,
    },
    distans_txt: {
        fontFamily: FONTS.regular,
        fontSize: moderateScale(13),
        marginLeft: moderateScale(10),
        color: Colors.black
    },
    modalbutton_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(20)
    },
    modalbotton_sty: {
        backgroundColor: Colors.buttonColor,
        width: moderateScale(120),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalbutton_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(14),
        color: Colors.secondaryFont
    },
});

//make this component available to the app
export default ViewSubcategory;
