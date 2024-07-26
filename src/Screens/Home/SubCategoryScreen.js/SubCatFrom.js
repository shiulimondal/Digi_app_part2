import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native';
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
import Toast from "react-native-simple-toast";
import Home from '../Home';
import HttpClient from '../../../Utils/HttpClient';

const { height, width } = Dimensions.get('screen');

const SubCatForm = (props) => {
    const ImgUri = "https://acuitysoftware.co/digi-help-app/storage/app/public"
    const route = useRoute();
    const cat_Data_id = route.params.CatId;
    const Sub_Data_id = route.params.SubID;
    const [loading, setLoading] = useState(true);
    const [btnLoader, setBtnLoader] = useState(false);
    const [getFormData, setgetFormData] = useState([]);
    const [formData, setFormData] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [dropdownValues, setDropdownValues] = useState({});
    const [selectedState, setSelectedState] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [ImageData, setImageData] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    console.log('formDataformDataformDataformData', formData);
    console.log('frommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmimageeeeeeeeeeeeeeeeeeeeeeee',ImageData);

    useEffect(() => {
        getSubAllData();
    }, []);

    const getSubAllData = async () => {
        setLoading(true);
        const data = {
            category_id: cat_Data_id,
            sub_category_id: Sub_Data_id,
        };
        HomeService.get_profilefrom(data)
            .then((res) => {
                console.log('Response:===================================', JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    setgetFormData(res.data.id)
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




    const openCamera = async (type, options) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                onButtonPress(type, options);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // const onButtonPress = async (type, options) => {
    //     const result = type === 'capture'
    //         ? await launchCamera(options)
    //         : await launchImageLibrary({ ...options, selectionLimit: 0 });
    //     if (result?.assets) {
    //         setSelectedDocuments([...selectedDocuments, ...result.assets]);
    //         setModalVisible(false);
    //     }
    // };


    const onButtonPress = async (type, options) => {
        try {
            const result = type === 'capture'
                ? await launchCamera(options)
                : await launchImageLibrary({ ...options, selectionLimit: 0 });
    
            console.log('Result:===================', result);
    
            if (result?.assets) {
                const selectedAssets = result.assets;
                setSelectedDocuments([...selectedDocuments, ...selectedAssets]);
    
                selectedAssets.forEach(async (asset) => {
                    const file = {
                        uri: asset.uri,
                        type: asset.type,
                        name: asset.fileName,
                    };
    
                    if (file.uri && file.type && file.name) {
                        try {
                            const response = await HttpClient.upload('/business-account/upload-image', file, {});
                            if (Array.isArray(response)) {
                                setImageData((prevImageData) => [...prevImageData, ...response]);
                                setModalVisible(false);
                            } else {
                                setImageData((prevImageData) => [...prevImageData, response]);
                                setModalVisible(false);
                            }
                        } catch (error) {
                            console.error('Image Upload Error:', error);
                        }
                    } else {
                        console.error('Invalid file object properties:', file);
                    }
                });
            }
        } catch (error) {
            console.error('Error in onButtonPress:', error);
        }
    };



    const getOptionList = async (pickerId, fieldName) => {
        const data = { option: pickerId };
        HomeService.setOptionList(data)
            .then((res) => {
                // console.log('ggggggggggggggg', res);
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
        if (name === 'state') {
            setSelectedState(value);
            if (value) {
                console.log('State selected:===============', value); 
                getStateList(value);
            }
        }
    };

    const getStateList = (stateId) => {
        console.log('Fetching districts for stateId:', stateId); 
        const value = {
            "option_list_id": stateId,
            "option": 2
        };
        HomeService.setOption_DisttrictList(value)
            .then((res) => {
                // console.log('Districts fetched=======================', res);
                if (res.status === true) {
                    // console.log('Districts fetched successfully:=======================', res.data);
                    const newDistricts = res.data || [];
                    setDropdownValues(prev => ({
                        ...prev,
                        district: newDistricts
                    }));
                } else {
                    // console.error('Failed to fetch districts:==========', res.message);
                    setDropdownValues(prev => ({
                        ...prev,
                        district: []
                    }));
                }
            })
            .catch((err) => {
                // console.error('Error fetching districts:', err);
                setDropdownValues(prev => ({
                    ...prev,
                    district: []
                }));
            });
    };


    const handleSubmit = () => {
        const finalFormData = formData.map(field => {
            if (field.type === 'file') {
                return {
                    ...field,
                    value: "file",
                    imageFileName: ImageData.map(doc => ({
                        uri: doc.uri,
                        type: doc.type,
                        fileName: doc.fileName,
                        fileSize: doc.fileSize,
                        height: doc.height,
                        width: doc.width,
                    }))
                };
            } else {
                return {
                    ...field,
                    value: formValues[field.name] || null
                };
            }
        });
        const finalData = {
            "form_id": getFormData,
            "form_data": finalFormData
        };
        console.log('Final Data:=========================', JSON.stringify(finalData));
        setBtnLoader(true);
        HomeService.submitFormData(finalData)
            .then((res) => {
                console.log('Submission Response:===========================', res);
                if (res) {
                    setBtnLoader(false);
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                    NavigationService.navigate('SubCategorySubscription')
                } else {
                    setBtnLoader(false);
                    Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
                }
            })
            .catch((err) => {
                setBtnLoader(false);
                console.error('Submit Error:', err);
            });
    };


    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.buttonColor} style={{ marginTop: height / 3 }} />
            ) : <>

                {formData && formData.length === 0 ?
                    <View style={styles.loader}>
                        <Image source={require('../../../assets/images/nodata.png')} style={styles.nodata_sty} />
                        <View style={styles.endbutton}>
                            <Text style={styles.endbutton_txt}>No Data Found</Text>
                        </View>
                    </View>
                    :
                    <>
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
                                                                source={selectedDocuments.length > 0 ? { uri: selectedDocuments[0]?.uri } : require('../../../assets/images/blankimg.png')}
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
                                                    <Text style={styles.input_title_txt}>{field?.label?.charAt(0).toUpperCase() + field?.label?.slice(1)}</Text>
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
                                                    <View>
                                                        <Text style={styles.input_title_txt}>{field?.label?.charAt(0).toUpperCase() + field?.label?.slice(1)}</Text>
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
                                                </View>
                                            );
                                        case 'textarea':
                                            return (
                                                <View key={index} style={styles.fieldContainer}>
                                                    <Text style={styles.input_title_txt}>{field?.label?.charAt(0).toUpperCase() + field?.label?.slice(1)}</Text>
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
                        </KeyboardAwareScrollView>

                    </>
                }
            </>
            }

            <Modal isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Upload Photo!</Text>
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
                            <Icon name="camera" size={18} type='Entypo' color={Colors.buttonColor} />
                            {" "}Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalbutton}
                        onPress={() => openCamera('library', {
                            selectionLimit: 1,
                            mediaType: 'photo',
                            includeBase64: false,
                            maxWidth: 500,
                            maxHeight: 500,
                            quality: 0.5
                        })}
                    >
                        <Text style={styles.modalbuttonText}>
                            <Icon name="image" size={18} type='Entypo' color={Colors.buttonColor} />
                            {" "}Library
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalCancel}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
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
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    fieldContainer: {
    },
    formContainer: {
        backgroundColor: Colors.cardColor,
        marginHorizontal: moderateScale(15),
    },
    fileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    fieldContainerpicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textareaMainContainer: {
        textAlignVertical: 'top',
    },
    textareaContainer: {
        backgroundColor: Colors.secondaryFont,
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(10)
    },
    pickerContainer: {
        backgroundColor: Colors.secondaryFont,
        height: moderateScale(48),
        borderRadius: moderateScale(6),
        width: width - moderateScale(30)
    },
    pickerText: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular
    },
    inputContainer: {
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(7),
        backgroundColor: Colors.secondaryFont
    },
    inputMainContainer: {
        marginTop: moderateScale(5)
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(12),
        color: Colors.secondaryFont
    },
    input_title_txt: {
        fontFamily: FONTS.Inter.medium,
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
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    },
    modalContainer: {
        backgroundColor: Colors.secondaryFont,
        padding: moderateScale(20),
        margin: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
    },
    modalTitle: {
        padding: moderateScale(10),
        borderBottomWidth: 1,
        marginBottom: moderateScale(15),
        fontSize: moderateScale(18),
        color: Colors.black,
        fontFamily: 'sans-serif',
    },
    modalbutton: {
        marginBottom: moderateScale(10),
    },
    modalbuttonText: {
        fontSize: moderateScale(18),
        padding: moderateScale(10),
        color: Colors.black,
        fontFamily: FONTS.Inter.medium,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nodata_sty: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: 'contain',
        tintColor: 'rgba(95,37,158,0.3)',
    },
    endbutton: {
        height: responsiveWidth(11),
        marginTop: responsiveWidth(5),
        marginBottom: responsiveWidth(6),
        marginHorizontal: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(280)
    },
    endbutton_txt: {
        color: Colors.buttonColor,
        fontFamily: FONTS.Inter.semibold,
        fontSize: responsiveFontSize(2.5)
    },
});

// Make this component available to the app
export default SubCatForm;
