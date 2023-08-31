import {StyleSheet, Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import React from 'react';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {deviceHeight} from '../../utils/helper';
import {AuthContext} from '../../screens/Auth/AuthContext';

const SortOption = ({setSortOption, setSortPressed, onBackgroundPressed}) => {
  const {language} = React.useContext(AuthContext);
  const changeOption = type => {
    setSortOption(type);
    setSortPressed(false);
  };
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
          {language.explore_option_header}
        </CustomText>
        <CustomButton onPress={() => changeOption(1)} type={'tertiary'}>
          {language.explore_option_1}
        </CustomButton>
        <CustomButton onPress={() => changeOption(2)} type={'tertiary'}>
          {language.explore_option_2}
        </CustomButton>
        <CustomButton onPress={() => changeOption(3)} type={'tertiary'}>
          {language.explore_option_3}
        </CustomButton>
        <CustomButton
          customStyles={{marginBottom: 32}}
          onPress={() => changeOption(4)}
          type={'tertiary'}>
          {language.explore_option_4}
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default SortOption;

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
