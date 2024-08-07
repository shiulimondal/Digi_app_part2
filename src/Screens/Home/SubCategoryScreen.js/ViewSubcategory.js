//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import NavigationService from '../../../Services/Navigation';
import { CheckBox, Icon, Picker } from 'react-native-basic-elements';
import { Colors } from '../../../Constants/Colors';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { useRoute } from '@react-navigation/native';
import SubCategoryListCard from '../../../Components/HomeCard/SubCategoryListCard';
import Modal from "react-native-modal";
import HomeService from '../../../Services/HomeServises';
import SubCatBottomTab from '../../../Components/BottomComponent/SubCatBottomTab';


// create a component
const ViewSubcategory = () => {
    const route = useRoute()
    const SubDataName = route.params.sub_name;
    const cat_idData = route.params.catId;
    const Sub_idData = route.params.subId;
    const [dropdownValue, setDropdownValue] = useState('');
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [subCatDataList, setsubCatDataList] = useState([])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        getSub_all_data()
    }, [])

    const getSub_all_data = async () => {
        const data = {
            "category_id": cat_idData,
            "sub_category_id": Sub_idData
        }
        HomeService.get_subcategory_list(data)
            .then((res) => {
                console.log("Response:aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", res);
                setLoading(false);
                if (res.status === true) {
                    setsubCatDataList(res.data)
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                setLoading(false);
            });
    };



    return (
        <View style={styles.container}>
            <ScreenHeader />
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.buttonColor} />
                </View>
            ) :
                <>


                    {
                        subCatDataList && subCatDataList.length === 0 ?
                            <View style={styles.loader}>
                                <Image source={require('../../../assets/images/nodata.png')} style={styles.nodata_sty} />
                                <View style={styles.button}>
                                    <Text style={styles.button_txt}>No Data Found</Text>
                                </View>
                            </View>
                            :
                            <>
                                <View style={styles.top_view}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ alignItems: 'center', flex: 1 }}>
                                            <Text style={styles.header_txt}>{SubDataName?.charAt(0)?.toUpperCase() + SubDataName?.slice(1)?.toLowerCase()}</Text>
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
                                            fontFamily: FONTS.Inter.regular
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
                                    data={subCatDataList}
                                    // data={[1,1,1,1,1,1,,1,1,1,1,1]}
                                    renderItem={({ item, index }) => (
                                        <SubCategoryListCard item={item} index={index} />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </>
                    }


                </>
            }

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
                            fontFamily: FONTS.Inter.regular
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
                            fontFamily: FONTS.Inter.regular
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
                            fontFamily: FONTS.Inter.regular
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
                                    fontFamily: FONTS.Inter.regular
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
                                    fontFamily: FONTS.Inter.regular
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
                        <Text style={styles.distans_txt}>0KM to 50KM</Text>
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
         
                        <View style={{ flex: 1 }} />
                        <View style={{
                            ...styles.bottom_card
                        }}>
                            <Text numberOfLines={1} style={styles.bottomcard_text}>WIll YOU ADD {SubDataName?.toUpperCase()} PROFILE ?</Text>
                        </View>

                        <View style={{
                            height: moderateScale(60),
                            bottom: 0,
                            backgroundColor: Colors.background,
                            elevation: 4
                        }}>
                            <SubCatBottomTab subName={SubDataName} CatId={cat_idData} SubID={Sub_idData} />
                        </View>

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
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerTop_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(2),
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
    modalView: {
        backgroundColor: "white",
        borderRadius: moderateScale(18),
        padding: moderateScale(20),
        // borderWidth: 2,
    },
    input_title_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        color: Colors.black,
        marginTop: moderateScale(7)
    },
    address_wish_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        textAlign: 'center',
        color: Colors.black,
    },
    distans_txt: {
        fontFamily: FONTS.Inter.regular,
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        color: Colors.secondaryFont
    },
    nodata_sty: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: 'contain',
        tintColor: 'rgba(95,37,158,0.3)',
    },
    button_txt: {
        color: Colors.buttonColor,
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        textAlign: 'center'
    },
    bottom_card: {
        height: moderateScale(50),
        backgroundColor: '#FFBC0E',
        marginTop: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        elevation: 4
    },
    bottomcard_text: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        paddingBottom: moderateScale(5),
        color: Colors.secondaryFont,
        marginHorizontal:moderateScale(5),
        textAlign:'center'
    }
});

//make this component available to the app
export default ViewSubcategory;
