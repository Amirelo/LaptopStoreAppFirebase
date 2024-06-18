import {Alert, Dimensions, Platform, ToastAndroid} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const emailRegex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;

export const priceFormat = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(price);
};

export const discountFormat = discount => {
  let result = '';
  if (discount.substring(0, 1) == '%') {
    result = discount.substring(1, 3) + '% off';
  }
  if (discount.length == 0) {
    result = '';
  }
  return result;
};

export const promoDetail = (percentOff, maxEffect) => {
  let result =
    percentOff.slice(1, 3) +
    percentOff.slice(0, 1) +
    ' off all laptop, maximum ' +
    priceFormat(maxEffect);
  return result;
};

export const addressFormat = (addressName, ward, district, city) => {
  return addressName + ', ' + ward + ', ' + district + ', ' + city;
};

export const displayMessage = (message) => {
  if (Platform.OS == "android"){
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
  if (Platform.OS == "ios"){
    Alert.alert(message);
  }
}

export const testEmailFormat = (email) =>{
  const res = emailRegex.test(email)
  res ? null : displayMessage("Email format is not acceptable")
  return res
}