import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Icon } from 'react-native-basic-elements';
import WorkCard from '../../Components/DrawerCard/WorkCard';
import ScreenHeader from '../../Components/Header/ScreenHeader';


const DrawerWorks = ({ navigation }) => {

    const WorkData = [
        {
            cat_logo: require('../../assets/images/work1.png'),
        },
        {
            cat_logo: require('../../assets/images/work2.png'),
        },
        {
            cat_logo: require('../../assets/images/work3.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' type='FontAwesome5' size={23} />
                        </Pressable>
                    </View>
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
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(17),
        color: Colors.black,
    }
});

export { DrawerWorks };
