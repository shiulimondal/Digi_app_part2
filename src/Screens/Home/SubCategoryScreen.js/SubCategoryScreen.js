//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import { Colors } from '../../../Constants/Colors';
import SubCategoryCard from '../../../Components/HomeCard/SubCategoryCard';
import { Icon } from 'react-native-basic-elements';
import { ScrollView } from 'react-native';
import HomeHeader from '../../../Components/Header/HomeHeader';
import NavigationService from '../../../Services/Navigation';

// create a component
const SubCategoryScreen = () => {
    const categoryData = [
        {
            cat_logo: require('../../../assets/images/sub1.png'),
            title: 'Find Bride'
        },
        {
            cat_logo: require('../../../assets/images/sub2.png'),
            title: 'Find Groom'
        },
        {
            cat_logo: require('../../../assets/images/sub3.png'),
            title: 'Caterer'
        },
        {
            cat_logo: require('../../../assets/images/sub4.png'),
            title: 'Photographer'
        },
        {
            cat_logo: require('../../../assets/images/sub5.png'),
            title: 'Cooks'
        },
        {
            cat_logo: require('../../../assets/images/sub6.png'),
            title: 'Musical party '
        }
    ];
    return (
        <View style={styles.container}>
            <HomeHeader/>
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Pressable onPress={() => NavigationService.goBack()}>
                            <Icon name='left' type='AntDesign' size={22} />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Marriage Subcategory</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal:moderateScale(15),
                     justifyContent:'space-between',
                     marginTop:moderateScale(15)
                }}>
                    {
                        categoryData.map((item, index) => {
                            return (
                                <SubCategoryCard item={item} key={index} />
                            )
                        })
                    }

                </View>

            </ScrollView>

            {/* <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                <FlatList
                    data={categoryData}
                    renderItem={({ item, index }) => (
                       
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View> */}


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
        backgroundColor: Colors.cardColor,
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

//make this component available to the app
export default SubCategoryScreen;
