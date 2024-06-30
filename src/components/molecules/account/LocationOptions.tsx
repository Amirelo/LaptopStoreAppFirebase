import {StyleSheet, FlatList, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomView from '../../atoms/CustomView';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
import {deviceHeight} from '../../../utils/helper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../screens/Auth/AuthContext';

interface Props{
  data: any,
   onLocationSelected(item:String): void,
    onBackgroundPressed(): void 
}

const LocationOptions = (props:Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {language} = React.useContext(AuthContext);
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

  const onAddNewAddressPressed = () => {
    navigation.navigate('New Address');
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
          {language.cartRecipient_tabHeader_address}
        </CustomText>

        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={props.data}
          initialNumToRender={3}
          keyExtractor={item => item.addressID}
          renderItem={({item}) => {
            return (
              <CustomView>
                <CustomButton
                  type={'tertiary'}
                  onPress={() => props.onLocationSelected(item)}
                  customStyles={styles.spacing}>
                  {item.addressName +
                    ', ' +
                    item.ward +
                    ', ' +
                    item.district +
                    ', ' +
                    item.city}
                </CustomButton>
              </CustomView>
            );
          }}
        />
        <CustomButton
          onPress={onAddNewAddressPressed}
          customStyles={{marginBottom: 32}}
          type={'tertiary'}>
          {language.cartRecipient_tab_addNew}
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default LocationOptions;

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
