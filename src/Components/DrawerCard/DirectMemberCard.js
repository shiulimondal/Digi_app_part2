// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { moderateScale } from '../../Constants/PixelRatio';
// import { Colors } from '../../Constants/Colors';
// import { FONTS } from '../../Constants/Fonts';

// // create a component
// const DirectMemberCard = ({ item, index }) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.list_view}>
//                 <View style={{ width: moderateScale(40), alignItems: 'center', justifyContent: 'center' }}>
//                     <Text style={{
//                         fontFamily: FONTS.Inter.semibold,
//                         fontSize: moderateScale(11),
//                         color: '#333333'
//                     }}>{index + 1}</Text>

//                 </View>

//                 <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
//                     <Text style={{
//                         fontFamily: FONTS.Inter.semibold,
//                         fontSize: moderateScale(11),
//                         color: '#333333'
//                     }}>{item.joiningDate}</Text>

//                 </View>

//                 <View style={{ width: moderateScale(130), alignItems: 'center', justifyContent: 'center' }}>
//                     <Text style={{
//                         fontFamily: FONTS.Inter.semibold,
//                         fontSize: moderateScale(11),
//                         color: '#333333'
//                     }}>{item.name}</Text>
//                     <Text style={{
//                         fontFamily: FONTS.Inter.semibold,
//                         fontSize: moderateScale(11),
//                         color: '#333333'
//                     }}>{item.phoneNo}</Text>

//                 </View>


//                 <View style={{ width: moderateScale(150), alignItems: 'center', justifyContent: 'center' }}>
//                     <Text numberOfLines={2} style={{
//                         maxWidth: '70%',
//                         fontFamily: FONTS.Inter.semibold,
//                         fontSize: moderateScale(11),
//                         color: '#333333'
//                     }}>{item.address}</Text>

//                 </View>

//                 <View style={{ width: moderateScale(200), alignItems: 'center', justifyContent: 'center' }}>
//                     <TouchableOpacity style={{
//                         ...styles.button_sty,
//                         backgroundColor: item.status === false ? '#FE0505' : '#00AB11',
//                         width:item.status === false ? moderateScale(100): moderateScale(100)

//                     }}>
//                         <Text style={{
//                             fontFamily: FONTS.Inter.semibold,
//                             fontSize: moderateScale(11),
//                             color: Colors.secondaryFont
//                         }}>{item.status === false ? 'INACTIVE' : 'Active Member'}</Text>
//                     </TouchableOpacity>
//                     {
//                         item.status === false ?
//                             <Text style={{
//                                 fontFamily: FONTS.Inter.semibold,
//                                 fontSize: moderateScale(12),
//                                 color: Colors.black
//                             }} >{item.status_message}</Text>
//                             :
//                             <Text numberOfLines={2} style={{
//                                 fontFamily: FONTS.Inter.semibold,
//                                 fontSize: moderateScale(12),
//                                 color: Colors.black,
//                                 maxWidth:'50%',
//                                 textAlign:'center'
//                             }}>{item.status_message}</Text>
//                     }


//                 </View>
//             </View>

//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         borderWidth: 1,
//         marginHorizontal: moderateScale(15),
//         borderColor: Colors.grey,
//         padding: moderateScale(3),
//         paddingHorizontal: 0
//     },
//     list_view: {
//         flexDirection: 'row',
//         borderTopRightRadius: moderateScale(10),
//         borderTopLeftRadius: moderateScale(10),
//         marginHorizontal: moderateScale(15),
//         // marginTop: moderateScale(15),
//         padding: moderateScale(2)
//     },
//     button_sty: {
//         height: moderateScale(26),
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: moderateScale(7)
//     }
// });

// //make this component available to the app
// export default DirectMemberCard;


//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

// create a component
const DirectMemberCard = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <View style={styles.list_view}>
                <View style={{ width: moderateScale(15), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: '#333333'
                    }}>{index + 1}</Text>

                </View>

                <View style={{ width: moderateScale(115), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: '#333333'
                    }}>{item.joiningDate}</Text>

                </View>

                <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: '#333333'
                    }}>{item.name}</Text>
                    <Text style={{
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: '#333333'
                    }}>{item.phoneNo}</Text>

                </View>


                <View style={{ width: moderateScale(80), alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={2} style={{
                        maxWidth: '90%',
                        fontFamily: FONTS.Inter.semibold,
                        fontSize: moderateScale(10),
                        color: '#333333',
                        textAlign:'center'
                    }}>{item.address}</Text>

                </View>

                <View style={{ width: moderateScale(100), alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        ...styles.button_sty,
                        backgroundColor: item.status === false ? '#FE0505' : '#00AB10',
                        width:item.status === false ? moderateScale(85): moderateScale(85)

                    }}>
                        <Text style={{
                            fontFamily: FONTS.Inter.semibold,
                            fontSize: moderateScale(10),
                            color: Colors.secondaryFont
                        }}>{item.status === false ? 'INACTIVE' : 'Active Member'}</Text>
                    </TouchableOpacity>
                    {
                        item.status === false ?
                            <Text style={{
                                fontFamily: FONTS.Inter.semibold,
                                fontSize: moderateScale(10),
                                color: Colors.black
                            }} >{item.status_message}</Text>
                            :
                            <Text numberOfLines={2} style={{
                                fontFamily: FONTS.Inter.semibold,
                                fontSize: moderateScale(10),
                                color: Colors.black,
                                maxWidth:'90%',
                                textAlign:'center'
                            }}>{item.status_message}</Text>
                    }


                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        marginHorizontal: moderateScale(15),
        borderColor: Colors.grey,
        padding: moderateScale(3),
        paddingHorizontal: 0
    },
    list_view: {
        flexDirection: 'row',
        borderTopRightRadius: moderateScale(10),
        borderTopLeftRadius: moderateScale(10),
        marginHorizontal: moderateScale(15),
        // marginTop: moderateScale(15),
        padding: moderateScale(2)
    },
    button_sty: {
        height: moderateScale(26),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(7)
    }
});

//make this component available to the app
export default DirectMemberCard;
