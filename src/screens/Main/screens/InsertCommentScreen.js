import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';
import {CustomView} from '../../../components/atoms';
import {MainContext} from '../MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';

const InsertCommentScreen = ({route, navigation}) => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const {productID} = route.params;

  const {onInsertUserRating} = useContext(MainContext);
  const {onGetUserByEmail, language} = useContext(AuthContext);


  const onAddCommentPressed = async () => {
    if (checkError() == false) {
      const email = await AsyncStorage.getItem('email');
      const userRes = await onGetUserByEmail(email);
      console.log(userRes);
      const res = await onInsertUserRating(
        rating,
        comment,
        userRes.data.userId,
        productID,
      );
      console.log(res);
      navigation.navigate('Home');
    }
  };

  const checkError = () => {
    let hasError = false;
    if (rating.length == 0 || comment.length == 0) {
      console.warn('Fields cannot be empty');
      hasError = true;
    } else if (rating > 5 || rating < 0) {
      console.warn('Rating must be from 0 - 5');
      hasError = true;
    }
    return hasError;
  };

  return (
    <CustomView>
      <CustomInput
        onChangeText={setRating}
        placeholder={language.placeholder_rating}
        marginTop={103}
        keyboardType={'numeric'}
      />
      <CustomInput
        onChangeText={setComment}
        placeholder={language.placeholder_comment}
        marginTop={8}
      />
      <CustomButton
        onPress={onAddCommentPressed}
        type={'primary'}
        marginTop={60}>
        {language.insertRating_button_postComment}
      </CustomButton>
    </CustomView>
  );
};

export default InsertCommentScreen;
