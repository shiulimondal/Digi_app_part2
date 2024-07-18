// Import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HomeHeader from '../../../Components/Header/HomeHeader';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { moderateScale } from '../../../Constants/PixelRatio';
import NavigationService from '../../../Services/Navigation';
import { AppButton, AppTextInput, Icon, Picker } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import HomeService from '../../../Services/HomeServises';
import Modal from "react-native-modal";
import * as ImagePicker from 'react-native-image-picker';

const { height, width } = Dimensions.get('screen');

// Create a component
const SubCatForm = (props) => {
    const route = useRoute();
    const cat_Data_id = route.params.CatId;
    const Sub_Data_id = route.params.SubID;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [dropdownValue, setDropdownValue] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        getSubAllData();
    }, []);

    const getSubAllData = async () => {
        const data = {
            "category_id": cat_Data_id,
            "sub_category_id": Sub_Data_id
        };
        HomeService.get_profilefrom(data)
            .then((res) => {
                console.log("Response:", JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    // Filter to only include required fields
                    const requiredFields = res.data.form_body.filter(field => field.is_required === "1");
                    setFormData(requiredFields);
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                setLoading(false);
            });
    };

    const handleInputChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Form Submitted==================:', formValues);
        // Send formValues to the API
    };

    const [selectedDocument, setSelectedDocument] = useState(null);
    const openCamera = async (type, options) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                onButtonPress(type, options)
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const onButtonPress = async (type, options) => {
        if (type === 'capture') {
            const result = await ImagePicker.launchCamera(options);
            console.log(result?.assets)
            setSelectedDocument(result?.assets)
            setModalVisible(false)
        } else {
            const result = await ImagePicker.launchImageLibrary(options);
            console.log(result?.assets)
            setModalVisible(false)
            setSelectedDocument(result?.assets)
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

                    {formData.map((field, index) => {
                        switch (field.type) {
                            case 'file':
                                return (
                                    <View key={index}>
                               

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: moderateScale(15)
                                        }}>
                                            <View style={styles.img_view}>
                                                {
                                                    selectedDocument === null ?
                                                        <Image source={require('../../../assets/images/blankimg.png')} style={styles.upload_img} />
                                                        :
                                                        <Image source={{ uri: selectedDocument[0].uri }} style={styles.upload_img} />
                                                }

                                            </View>
                                            <TouchableOpacity style={styles.reg_button}>
                                                <Text style={styles.button_reg_txt}>Upload Image</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            case 'text':
                                return (
                                    <View key={index}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <AppTextInput
                                            placeholder={field.label}
                                            inputContainerStyle={{
                                                borderRadius: moderateScale(5),
                                                paddingHorizontal: moderateScale(7)
                                            }}
                                            mainContainerStyle={{
                                                marginTop: moderateScale(5)
                                            }}
                                            value={formValues[field.name]}
                                            onChangeText={(val) => handleInputChange(field.name, val)}
                                        />
                                    </View>
                                );
                            case 'select':
                                return (
                                    <View key={index}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <Picker
                                            placeholder="Select"
                                            options={[
                                                { label: 'Item 1', value: 'item1' },
                                                { label: 'Item 2', value: 'item2' },
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
                                            selectedValue={formValues[field.name]}
                                            onValueChange={(val) => handleInputChange(field.name, val)}
                                        />
                                    </View>
                                );
                            case 'textarea':
                                return (
                                    <View key={index}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <AppTextInput
                                            placeholder={field.label}
                                            inputContainerStyle={{
                                                borderRadius: moderateScale(5),
                                                paddingHorizontal: moderateScale(7)
                                            }}
                                            mainContainerStyle={{
                                                marginTop: moderateScale(5),
                                                height: moderateScale(100)
                                            }}
                                            multiline
                                            value={formValues[field.name]}
                                            onChangeText={(val) => handleInputChange(field.name, val)}
                                            numberOfLines={5}
                                            textAlignVertical="top"
                                        />
                                    </View>
                                );
                            default:
                                return null;
                        }
                    })}
                    <AppButton
                        title="SUBMIT"
                        style={styles.button}
                        textStyle={styles.button_txt}
                        onPress={handleSubmit}
                    />
                </View>
            </KeyboardAwareScrollView>


            <Modal isVisible={isModalVisible} transparent={true}>
                <View style={styles.container1}>
                    <Text style={styles.title}>Add Photo!</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => openCamera("capture", {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={styles.buttonText}>
                            <Icon name="camera" size={18} type='Entypo' color="#C6C6C6" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => openCamera("gallery", {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={styles.buttonText}>
                            <Icon name="file" size={18} type='Entypo' color="#C6C6C6" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

// Define your styles
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
    },
    container1: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 15,
        fontSize: 18,
        color: 'black',
        fontFamily: 'sans-serif',
    },
    button: {
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        padding: 10,
        color: 'black',
        fontFamily: 'sans-serif',
    },
});

// Make this component available to the app
export default SubCatForm;
