import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator, Dimensions } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';
import { Icon } from 'react-native-basic-elements';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import AboutUsCard from '../../Components/DrawerCard/AboutUsCard';
import HomeService from '../../Services/HomeServises';

const { height, width } = Dimensions.get('screen');
const AboutUs = ({ navigation }) => {
    const [aboutUsData, setAboutUsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAboutUsData();
    }, []);

    const getAboutUsData = async () => {
        setLoading(true)
        try {
            const response = await HomeService.fatchAboutUs();
            if (response && response.success) {
                setLoading(false)
                setAboutUsData([response.data]);
            }
        } catch (error) {
            setLoading(false)
            console.error('Error fetching About Us data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScreenHeader />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.buttonColor} style={{ marginTop: height / 3 }} />
            ) : <>

                <View style={styles.top_view}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Pressable onPress={() => navigation.goBack()}>
                                <Icon name='chevron-left' type='FontAwesome5' size={23} />
                            </Pressable>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={styles.header_txt}>How it Works</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={aboutUsData}
                    renderItem={({ item, index }) => (
                        <AboutUsCard item={item} index={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    top_view: {
        backgroundColor: Colors.cardColor,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    }
});

export { AboutUs };
