import {Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomView from '../../atoms/CustomView';
import CustomButton from '../button/CustomButton';
import CustomText from '../../atoms/CustomText';
import {deviceHeight} from '../../../utils/helper';

interface Props{
  onDeletePressed(): void,
onBackgroundPressed(): void,
}

const CartOption = (props:Props) => {
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
      props.onBackgroundPressed();
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
      marginBottom={0}
      preset={'absolute'}
      styles={{opacity: backgroundAnimated}}>
      <CustomButton
        onPress={onOutsidePressed}
        noAnim={true}
        customStyles={styles.unselectable}
        marginTop={0}
      />
      <CustomView
        styles={{transform: [{translateY: animatedValue}]}}
        preset={'absoluteBottomItem'}>
        <CustomText styles={styles.spacing} preset={'subtitleBold'}>
          Action
        </CustomText>
        <CustomButton
          onPress={props.onDeletePressed}
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
