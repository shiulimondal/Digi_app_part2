//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import { Colors } from '../../Constants/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AppButton } from 'react-native-basic-elements';

// create a component
const HomeModal = ({setModalVisible,isModalVisible}) => {
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modal_box_view}>
                        <Text style={styles.modal_massege}>Referral income Instruction</Text>
                        <Text style={styles.modal_text}>Your referral income is actually your affiliate
                            income Unlimited referrals, unlimited
                            commissions. Members referred by you will be
                            considered your customers for life. You'll
                            receive lifetime benefits from your referrals.
                            Whenever your direct member pays for adding
                            a profile or using services, you'll earn a 15%
                            commission. Additionally, for depth 2 members,
                            you'll receive a 5% commission.</Text>
                    </View>

                    <View style={{ ...styles.modal_box_view, marginTop: moderateScale(15) }}>
                        <Text style={styles.modal_massege}>Something maintenance charge</Text>
                        <Text style={styles.modal_text}>6% maintenance fee will be deducted from your
                            income. while withdrawing money from your
                            withdrawal amount</Text>
                    </View>
                    <AppButton
                        shadow={true}
                        title='Got It'
                        textStyle={styles.modal_button_txt_sty}
                        style={styles.modal_button_sty}
                        onPress={() => setModalVisible(false)}

                    />
                </View>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius:moderateScale(10),
        padding:moderateScale(20),
        alignItems: 'center',
      },
      modal_box_view: {
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.grey,
        padding: moderateScale(10)
      },
      modal_massege: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        color: Colors.black,
      },
      modal_text: {
        fontFamily: FONTS.regular,
        fontSize: moderateScale(13),
        color: Colors.black,
        textAlign: 'center',
        marginTop: moderateScale(10)
      },
      modal_button_sty: {
        backgroundColor: 'red',
        borderRadius: 20,
        height: moderateScale(35),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: responsiveWidth(20),
        marginTop: responsiveHeight(4)
      },
      modal_button_txt_sty: {
        fontFamily: FONTS.Inter.bold,
        fontSize: moderateScale(15),
        alignSelf: 'center',
        color: '#fff'
      },
});

//make this component available to the app
export default HomeModal;
