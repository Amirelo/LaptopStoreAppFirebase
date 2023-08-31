import {Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomView from '../atoms/CustomView';
import CustomButton from './CustomButton';
import CustomText from '../atoms/CustomText';
import {deviceHeight} from '../../utils/helper';

const CartOption = ({onDeletePressed, onBackgroundPressed}) => {
  const animatedValue = useRef(new Animated.Value(255)).current;
  const slideIn = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(animatedValue, {
      toValue: 255,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onOutsidePressed = () => {
    slideOut();
    fadeOut();
    setTimeout(() => {
      onBackgroundPressed();
    }, 200);
  };

  const backgroundAnimated = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    Animated.timing(backgroundAnimated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(backgroundAnimated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideIn();
    fadeIn();
  }, []);
  return (
    <CustomView
      marginTop={0}
      type={'absolute'}
      animated={true}
      customStyles={{opacity: backgroundAnimated}}>
      <CustomButton
        onPress={onOutsidePressed}
        noAnim={true}
        customStyles={styles.unselectable}
        marginTop={0}
      />
      <CustomView
        customStyles={{transform: [{translateY: animatedValue}]}}
        animated={true}
        type={'absoluteBottomItem'}>
        <CustomText customStyles={styles.spacing} textStyle={'subtitleBold'}>
          Action
        </CustomText>
        <CustomButton
          onPress={onDeletePressed}
          type={'tertiary'}
          customStyles={{marginBottom: 32}}>
          Delete
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default CartOption;

const styles = StyleSheet.create({
  unselectable: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: deviceHeight,
    alignItems: 'center',
  },
  spacing: {
    padding: 16,
  },
});
