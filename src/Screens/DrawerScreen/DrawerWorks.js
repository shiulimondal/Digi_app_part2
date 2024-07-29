import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';
import WorkCard from '../../Components/DrawerCard/WorkCard';
import ScreenHeader from '../../Components/Header/ScreenHeader';
import HomeService from '../../Services/HomeServises';


const { height, width } = Dimensions.get('screen');
const DrawerWorks = ({ navigation }) => {
    const [WorkData, setWorkData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWorkData();
    }, []);

    const getWorkData = async () => {
        setLoading(true)
        HomeService.fatch_work_list()
            .then((res) => {
                setLoading(false)
                if (res && res.success == true) {
                    console.log('ressssssssssssssshowwwwwwww', res.data);
                    setWorkData(res.data)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.error('Error fetching About Us data:', err);
            })
    }


    return (
        <View style={styles.container}>
            <ScreenHeader />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.buttonColor} style={{ marginTop: height / 3 }} />
            ) : <>
                <View style={styles.top_view}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={styles.header_txt}>How it's Work</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={WorkData}
                    renderItem={({ item, index }) => (
                        <WorkCard item={item} index={index} />
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
        backgroundColor: Colors.background,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    }
});

export { DrawerWorks };
