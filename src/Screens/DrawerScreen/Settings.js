//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { Icon, Card } from 'react-native-basic-elements';
import { Pressable } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Switch } from 'react-native-switch';
import ScreenHeader from '../../Components/Header/ScreenHeader';

// create a component
const Settings = ({ navigation }) => {

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    return (
        <View style={styles.container}>
             <ScreenHeader />
            <View style={styles.top_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={styles.header_txt}>Settings</Text>
                    </View>
                </View>
            </View>

            <Card style={{ ...styles.card_sty }}>
                <Text style={styles.notification_txt}>Notification</Text>

                <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                    circleSize={22}
                    barHeight={20}
                    circleBorderWidth={0.3}
                    backgroundActive={'green'}
                    backgroundInactive={'#D0D3D4'}
                    circleActiveColor={'#fff'}
                    circleInActiveColor={'#D0D3D4'}
                    changeValueImmediately={true}
                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                    outerCircleStyle={{
                        borderWidth: 0,
                    }}
                    containerStyle={{
                        marginRight: moderateScale(10)
                    }}
                    renderActiveText={false}
                    renderInActiveText={false}
                    switchLeftPx={2}
                    switchRightPx={2}
                    switchWidthMultiplier={2}
                    switchBorderRadius={10}
                />
            </Card>

            <Card onPress={()=>navigation.navigate('ChangePassword')} style={{ ...styles.card_sty }}>
                <Text style={styles.notification_txt}>Change Password</Text>

                <Icon  name='right' type='AntDesign' size={22}/>
            </Card>

            <Card style={{ ...styles.card_sty }}>
                <Text style={{...styles.notification_txt,color:'#FE0505'}}>Delete Account</Text>

               
            </Card>
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
        backgroundColor: Colors.background,
        padding: moderateScale(7),
        paddingHorizontal: moderateScale(20),
    },
    header_txt: {
        textAlign: 'center',
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(17),
        color: Colors.black,
    },
    card_sty: {
        marginTop: moderateScale(10),
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15),
        padding:moderateScale(15)
    },
    notification_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.black
    },
    
});

//make this component available to the app
export { Settings };
