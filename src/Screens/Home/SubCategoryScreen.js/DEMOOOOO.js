// Import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ScreenHeader from '../../../Components/Header/ScreenHeader';
import { Colors } from '../../../Constants/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { moderateScale } from '../../../Constants/PixelRatio';
import NavigationService from '../../../Services/Navigation';
import { AppButton, AppTextInput, Icon, Picker } from 'react-native-basic-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import HomeService from '../../../Services/HomeServises';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { height, width } = Dimensions.get('screen');

const SubCatForm = (props) => {
    const route = useRoute();
    const cat_Data_id = route.params.CatId;
    const Sub_Data_id = route.params.SubID;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [dropdownValues, setDropdownValues] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        getSubAllData();
    }, []);

    const getSubAllData = async () => {
        const data = {
            category_id: cat_Data_id,
            sub_category_id: Sub_Data_id,
        };
        HomeService.get_profilefrom(data)
            .then((res) => {
                console.log('Response:', JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    const requiredFields = res.data.form_body.filter((field) => field.is_required === '1');
                    setFormData(requiredFields);
                    requiredFields.forEach(field => {
                        if (field.type === 'select') {
                            getOptionList(field.option, field.name);
                        }
                    });
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false);
            });
    };

    const getOptionList = async (pickerId, fieldName) => {
        const data = { option: pickerId };
        HomeService.setOptionList(data)
            .then((res) => {
                if (res.status === true) {
                    setDropdownValues((prev) => ({
                        ...prev,
                        [fieldName]: res.data,
                    }));
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };

    const handleInputChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log('Form Submitted:', formValues);
        // Send formValues to the API
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const openCamera = async (type, options) => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                onButtonPress(type, options);
            } else {
                console.log('Camera or storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const onButtonPress = async (type, options) => {
        if (type === 'capture') {
            const result = await launchCamera(options);
            setSelectedDocument(result?.assets);
            setModalVisible(false);
        } else {
            const result = await launchImageLibrary(options);
            setSelectedDocument(result?.assets);
            setModalVisible(false);
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
                <View style={styles.formContainer}>
                    {formData.map((field, index) => {
                        switch (field.type) {
                            case 'file':
                                return (
                                    <View key={index} style={styles.fieldContainer}>
                                        <View style={styles.fileInputContainer}>
                                            <View style={styles.img_view}>
                                                <Image
                                                    source={selectedDocument ? { uri: selectedDocument[0].uri } : require('../../../assets/images/blankimg.png')}
                                                    style={styles.upload_img}
                                                />
                                            </View>
                                            <TouchableOpacity onPress={toggleModal} style={styles.reg_button}>
                                                <Text style={styles.button_reg_txt}>Upload Image</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            case 'text':
                                return (
                                    <View key={index} style={styles.fieldContainer}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <AppTextInput
                                            placeholder={field.label}
                                            inputContainerStyle={styles.inputContainer}
                                            mainContainerStyle={styles.inputMainContainer}
                                            value={formValues[field.name]}
                                            onChangeText={(val) => handleInputChange(field.name, val)}
                                        />
                                    </View>
                                );
                            case 'select':
                                return (
                                    <View key={index} style={styles.fieldContainerpicker}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <Picker
                                            placeholder="Select"
                                            labelKey="option_name"
                                            valueKey="id"
                                            options={dropdownValues[field.name] || []}
                                            textStyle={styles.pickerText}
                                            containerStyle={styles.pickerContainer}
                                            selectedValue={formValues[field.name]}
                                            onValueChange={(val) => handleInputChange(field.name, val)}
                                        />
                                    </View>
                                );
                            case 'textarea':
                                return (
                                    <View key={index} style={styles.fieldContainer}>
                                        <Text style={styles.input_title_txt}>{field.label}</Text>
                                        <AppTextInput
                                            placeholder={field.label}
                                            inputContainerStyle={styles.textareaContainer}
                                            mainContainerStyle={styles.textareaMainContainer}
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
            <Modal isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Photo!</Text>
                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCamera('capture', {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={styles.modalbuttonText}>
                            <Icon name="camera" size={18} type='Entypo' color="#C6C6C6" /> Open Camera
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCamera('gallery', {
                            saveToPhotos: true,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={styles.modalbuttonText}>
                            <Icon name="folder" size={18} type='Entypo' color="#C6C6C6" /> Upload From gallery
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
    fieldContainer:{

    },
    formContainer:{
        backgroundColor: Colors.cardColor,
        marginHorizontal:moderateScale(15),
    },
    fileInputContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:moderateScale(10)
    },
    fieldContainerpicker:{
      
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
    modalbutton: {
        marginBottom: 10,
    },
    modalbuttonText: {
        fontSize: 18,
        padding: 10,
        color: 'black',
        fontFamily: 'sans-serif',
    },
});

// Make this component available to the app
export default SubCatForm;
