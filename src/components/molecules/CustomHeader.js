import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import * as images from '../../assets/images/';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomView from '../atoms/CustomView';
import {useNavigation} from '@react-navigation/native';
import CustomButtonBare from '../atoms/CustomButtonBare';
import {AuthContext} from '../../screens/Auth/AuthContext';

const CustomHeader = ({
  type,
  onSearchText,
  onViewListPressed,
  onSortPressed,
  onFilterPressed,
  sortType,
}) => {
  const [viewListPressed, setViewListPressed] = useState(true);
  const navigation = useNavigation();
  const {language} = React.useContext(AuthContext);

  const exploreSortArr = [
    language.arr_explore_sort_0,
    language.arr_explore_sort_1,
    language.arr_explore_sort_2,
    language.arr_explore_sort_3,
    language.arr_explore_sort_4,
  ];

  const onFavoritePress = () => {
    navigation.navigate('Favorite');
  };

  const onNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const onViewIconPressed = () => {
    setViewListPressed(!viewListPressed);
    onViewListPressed();
  };

  return (
    <>
      {type == 'home' ? (
        <CustomView backgroundColor={'none'} type={'header'}>
          <CustomView backgroundColor={'none'} type={'row'}>
            <CustomButton
              type={'image'}
              source={images.ic_favorite}
              onPress={onFavoritePress}
              marginTop={0}
            />
            <CustomButton
              type={'image'}
              source={images.ic_notification}
              onPress={onNotificationPress}
              marginTop={0}
            />
          </CustomView>
        </CustomView>
      ) : (
        <CustomView marginTop={32} type={'none'}>
          <CustomInput
            source={images.ic_search}
            type={'tertiary'}
            onChangeText={onSearchText}
            placeholder={language.placeholder_search}
            width={'90%'}
          />
          <CustomView marginTop={12} type={'rowJustify90Screen'}>
            {/* <CustomButtonBare type={'rowJustify'} onPress={onFilterPressed}>
              <CustomView type={'row'}>
                <CustomImage
                  tintColor={'text'}
                  source={images.ic_filter}
                  type={'searchBarIcon'}
                />
                <CustomText textStyle={'normal'} marginTop={0}>
                  {language.explore_text_filter}
                </CustomText>
              </CustomView> 
            </CustomButtonBare>*/}
            <CustomButtonBare type={'none'} onPress={onSortPressed}>
              <CustomView type={'row'}>
                <CustomImage
                  tintColor={'text'}
                  source={images.ic_sort}
                  type={'searchBarIcon'}
                />
                <CustomText textStyle={'normal'} marginTop={0}>
                  {exploreSortArr[sortType]}
                </CustomText>
              </CustomView>
            </CustomButtonBare>
            <CustomButtonBare onPress={onViewIconPressed}>
              {viewListPressed ? (
                <CustomImage
                  tintColor={'text'}
                  source={images.ic_view_list}
                  type={'searchBarIcon'}
                />
              ) : (
                <CustomImage
                  source={images.ic_view_module}
                  type={'searchBarIcon'}
                />
              )}
            </CustomButtonBare>
          </CustomView>
        </CustomView>
      )}
    </>
  );
};

export default CustomHeader;
