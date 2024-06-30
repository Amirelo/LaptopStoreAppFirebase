import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import * as images from '../../../assets/images';
import CustomInput from '../CustomInput';
import CustomButton from '../button/CustomButton';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomView from '../../atoms/CustomView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomButtonBare from '../button/CustomButtonBare';
import {AuthContext} from '../../../screens/Auth/AuthContext';

interface Props{
  type: 'home' |undefined,
onSearchText?(): void,
onViewListPressed?():void,
onSortPressed?(): void,
onFilterPressed?(): void,
sortType?: any,
}

const CustomHeader = (props:Props) => {
  const [viewListPressed, setViewListPressed] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();
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
    props.onViewListPressed ? props.onViewListPressed() : null;
  };

  return (
    <>
      {props.type == 'home' ? (
        <CustomView backgroundColor={'none'} preset={'header'}>
          <CustomView backgroundColor={'none'} preset={'row'}>
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
        <CustomView marginBottom={32} preset={'none'}>
          <CustomInput
            source={images.ic_search}
            onChangeText={props.onSearchText}
            placeholder={language.placeholder_search}
          />
          <CustomView marginBottom={12} preset={'rowJustify90Screen'}>
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
            <CustomButtonBare type={'none'} onPress={props.onSortPressed}>
              <CustomView preset={'row'}>
                <CustomImage
                  tintColor={'text'}
                  source={images.ic_sort}
                  preset={'searchBarIcon'}
                />
                <CustomText preset={'normal'} marginBottom={0}>
                  {exploreSortArr[props.sortType]}
                </CustomText>
              </CustomView>
            </CustomButtonBare>
            <CustomButtonBare onPress={onViewIconPressed}>
              {viewListPressed ? (
                <CustomImage
                  tintColor={'text'}
                  source={images.ic_view_list}
                  preset={'searchBarIcon'}
                />
              ) : (
                <CustomImage
                  source={images.ic_view_module}
                  preset={'searchBarIcon'}
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
