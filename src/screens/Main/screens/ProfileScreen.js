import React, {useEffect, useState} from 'react';
import CustomView from '../../../components/atoms/CustomView';
import CustomButtonBare from '../../../components/atoms/CustomButtonBare';
import CustomImage from '../../../components/atoms/CustomImage';
import AccountTab from '../../../components/molecules/AccountTab';
import {AuthContext} from '../../Auth/AuthContext';

const ProfileScreen = ({route, navigation}) => {
  const {userInfo} = route.params;
  const [user, setUser] = useState(userInfo);
  const {language} = React.useContext(AuthContext);
  console.log(userInfo);

  const onGoBack = (data, type) => {
    setUser({});
    console.warn('goback');
    switch (type) {
      case 'USERNAME':
        userInfo.username = data;
        break;
      case 'FULLNAME':
        userInfo.fullname = data;
        break;
      case 'IMAGELINK':
        userInfo.imageLink = data;
        break;
      case 'BIRTHDAY':
        userInfo.birthday = data;
        break;
      case 'GENDER':
        userInfo.gender = data;
        break;
      case 'STATUS':
        userInfo.status = data;
        break;
      case 'PHONENUMBER':
        userInfo.phonenumber = data;
        break;
      default:
        break;
    }
    setUser(userInfo);
    route.params.onGoBackAccount(userInfo);
  };

  const onAccountTabPressed = type => {
    navigation.navigate('Update User Information', {
      type: type,
      email: userInfo.email,
      onGoBack: onGoBack,
    });
  };

  return (
    <CustomView scrollable={true}>
      <CustomButtonBare>
        <CustomImage
          source={user.imageLink}
          linkType={'uri'}
          type={'logo'}
          marginTop={50}
        />
      </CustomButtonBare>

      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('USERNAME')}
        title={language.profile_tab_username}
        subtitle={user.username}
      />
      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('PHONENUMBER')}
        title={language.profile_tab_phoneNumber}
        subtitle={user.phonenumber}
      />
      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('BIRTHDAY')}
        title={language.profile_tab_birthday}
        subtitle={user.birthday}
      />
    </CustomView>
  );
};

export default ProfileScreen;
