import {View, Text, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CustomText, CustomView} from '../../../components/atoms';
import {MainContext} from '../MainContext';
import {deviceWidth} from '../../../utils/helper';
import CommentItem from '../../../components/molecules/CommentItem';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../../Auth/AuthContext';

const ProductCommentScreen = ({navigation, route}) => {
  const {onGetProductRatingsByID} = useContext(MainContext);
  const {language} = useContext(AuthContext);
  const {productID} = route.params;
  const [comments, setComments] = useState({});

  const initData = async () => {
    const res = await onGetProductRatingsByID(productID);
    setComments(res.data);
  };

  const onAddCommentPressed = () => {
    navigation.navigate('New Comment', {productID: productID});
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <FlatList
        width={deviceWidth}
        marginTop={32}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        data={comments}
        initialNumToRender={3}
        keyExtractor={item => item.ratingID}
        renderItem={({item}) => {
          return <CommentItem data={item} />;
        }}
      />

      <CustomButton
        onPress={onAddCommentPressed}
        backgroundColor={'warn'}
        type={'primary'}
        marginTop={32}>
        {language.rating_button_addComment}
      </CustomButton>
      <CustomText />
    </CustomView>
  );
};

export default ProductCommentScreen;
