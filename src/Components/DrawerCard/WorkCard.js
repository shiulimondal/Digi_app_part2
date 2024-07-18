//import libraries
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const { height, width } = Dimensions.get('screen');

// create a component
const WorkCard = ({ item, index }) => {
    const videoRef = useRef(null);
    const background = {uri: item.video_path};
    const [paused, setPaused] = useState(true); 
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const onBuffer = () => {
        console.log('Buffering...');
    };

    const onError = () => {
        console.error('Error loading video');
    };

    const onLoad = (data) => {
        setDuration(data.duration);
    };

    const onProgress = (data) => {
        setCurrentTime(data.currentTime);
    };

    const togglePlayPause = () => {
        setPaused(!paused);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading_txt}>1.<Text>{' '}{item.title}</Text></Text>
            <View style={styles.videoContainer}>
                <Video
                    source={background}
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    onLoad={onLoad}
                    onProgress={onProgress}
                    style={styles.backgroundVideo}
                    paused={paused}
                />
                <View style={styles.controls}>
                    <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
                        <Icon name={paused ? 'play' : 'pause'} size={25} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.controls_txt}>
                <Text style={styles.duration}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                </View>
              
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(7),
        marginHorizontal: moderateScale(15),
        marginBottom:moderateScale(10)
    },
    videoContainer: {
        height: height / 3.9,
        width: width - moderateScale(30),
        position: 'relative', 
    },
    backgroundVideo: {
        height: '100%',
        width: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: moderateScale(80),
        left: moderateScale(140),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    controls_txt: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 5,
    },
    controlButton: {
        marginRight: 0,
    },
    duration: {
        color: '#FFF',
        fontSize: 14,
    },
    heading_txt: {
        fontFamily: FONTS.semibold,
        fontSize: moderateScale(15),
        color: Colors.black,
    },
});

//make this component available to the app
export default WorkCard;
