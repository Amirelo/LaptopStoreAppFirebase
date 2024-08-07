import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CustomText from '../../atoms/CustomText';
import CustomView from '../../atoms/CustomView';

const bannerData = {
  day: 21,
  hour: 2,
  minute: 30,
};

interface Props {
  source: any;
  header: String;
}

const CustomBanner = (props: Props) => {
  return (
    <CustomView preset={'banner'} marginBottom={0}>
      <Image style={styles.banner_image} source={props.source} />
      <CustomText
        styles={{marginStart: '5%'}}
        marginBottom={32}
        preset={'titleBold'}
        color={'textConstrast'}>
        {props.header+''}
      </CustomText>
      {/* <View style={styles.timerContainer}>
        <CustomText hasBox={true} textStyle={'normalBold'}>
          {timeLengthCheck(bannerData.day)}
        </CustomText>
        <CustomText textColor={'textConstrast'} textStyle={'normalBold'}>
          :
        </CustomText>
        <CustomText hasBox={true} textStyle={'normalBold'}>
          {timeLengthCheck(bannerData.hour)}
        </CustomText>
        <CustomText textColor={'textConstrast'} textStyle={'normalBold'}>
          :
        </CustomText>
        <CustomText hasBox={true} textStyle={'normalBold'}>
          {timeLengthCheck(bannerData.minute)}
        </CustomText>
      </View> */}
    </CustomView>
  );
};

export default CustomBanner;

const styles = StyleSheet.create({
  banner_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginStart: 16,
  },
});
