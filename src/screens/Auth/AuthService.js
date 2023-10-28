import { axiosInstance } from '../../utils/axios';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// User
export const signIn = async (username, password) => {
  const ref = database().ref('/users');
  const res = await ref
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        if (item.val().password == password) {
          console.log('Login success');
          returnItem = item.val();
        }
      });
      return returnItem;
    })
    .catch(error => {
      console.log('On Sign In Error:', error);
      return null;
    });
  return res;
};

export const signUp = async (
  username,
  password,
  email,
  phoneNumber,
  fullName,
  birthday,
) => {
  const newReference = database().ref('/users').push();
  newReference
    .set({
      userID: newReference.key,
      username: username,
      userPassword: password,
      email: email,
      phonenumber: phoneNumber,
      fullname: fullName,
      gender: 'Unknown',
      birthday: birthday,
    })
    .then(() => console.log('User added'));
};

export const sendVerificationCode = async email => {
  const actionCodeSettings = {
    android: {
      packageName: 'com.laptopstorefirebase',
      installApp: true
    }

  }
  auth().sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
    return true
  }).catch(error => {
    console.log(error);
    return false;
  })
};

export const checkEmail = async (email, type) => {
  const ref = database().ref('/users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      if (returnItem != null){
        return true;
      } else{
        return false;
      }
    });
};

export const updateUserFullname = async (data, email) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        item.ref.update({
          fullname: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserPhoneNumber = async (data, email) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        item.ref.update({
          phonenumber: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserBirthday = async (data, email) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        item.ref.update({
          birthday: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserPassword = async (data, email) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        item.ref.update({
          password: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserImage = async (data, email) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        item.ref.update({
          imageLink: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

// Address
export const getUserAddress = async username => {
  const data = {
    username: username,
  };
  const res = await axiosInstance.post(
    '/address/get-addresses-by-username.php',
    data,
  );
  return res;
};

export const getAddressesByEmail = async email => {
  const ref = database().ref('users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(async snapshot => {
      let user = null;
      let returnItem = [];
      snapshot.forEach(item => {
        user = item.val();
      });
      const addressRef = database().ref('addresses');
      return await addressRef
        .orderByChild('userID')
        .equalTo(user.userID)
        .once('value')
        .then(snapshot2 => {
          snapshot2.forEach(curItem => {
            returnItem = [...returnItem, curItem.val()];
          });
          return returnItem;
        });
    });
};

export const insertAddress = async (
  addressName,
  ward,
  district,
  city,
  status,
  userID,
) => {
  const ref = database().ref('addresses');
  const newRef = ref.push();

  newRef.set({
    addressID: newRef.key,
    addressName: addressName,
    ward: ward,
    district: district,
    city: city,
    status: status,
    userID: userID
  }).then(() => console.log('Address Inserted'))


  return newRef;
};

export const updateAddressInfo = async (data, type, addressID, userID) => {
  const ref = database().ref('addresses/' + addressID);
  const res = ref.update({
    data: data,
    type: type,
    addressID: addressID,
    userID: userID
  })
  return res;
};

// Coupon

export const getUserCoupon = async userID => {
  const ref = database().ref('coupons');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem = [];
      snapshot.forEach(item => {
        returnItem = [...returnItem, item.val()];
      });
      return returnItem;
    });
};

// Favorite
export const getUserFavorite = async userID => {
  const ref = database().ref('favorites');
  const res = ref.orderByChild('userID').equalTo(userID).once('value').then(() => {
    console.log('get success');
  })
  return res;
};

export const updateUserFavoriteStatus = async (
  favoriteID,
  userID,
  isFavorite,
) => {
  const ref = database().ref('favorites/' + favoriteID);
  return ref.update({
    isFavorite: isFavorite
  })
};

// Rating

export const getUserAllRatings = async userID => {
  return database.ref('ratings').orderByChild('userID').equalTo(userID).once('value').then(snapshot => {
    let list = [];
    snapshot.forEach(item => {
      list = [...list, item];
    })
    return item;
  })
};

export const updateUserRating = async (
  ratingID,
  rating,
  comment,
  status,
  userID,
  productID,
) => {
  return database().ref('ratings/' + ratingID).update({
    rating: rating,
    comment: comment,
    status: status,
  })
};

export const updateUserRatingStatus = async (ratingID, userID, status) => {
  return database().ref('ratings/' + ratingID).update({
    status: status,
  })
};

export const getRatingImage = async () => {
  return database.ref('ratingImages').once('value');
};

export const getRatingImageByRatingID = async ratingID => {
  return database.ref('ratingImages').orderByChild('ratingID').equalTo(ratingID).once('value').then(snapshot => {
    let list = [];
    snapshot.forEach(item => {
      list = [...list, item];
    })
    return list;
  })
};

export const getUserNotification = async userID => {
  return database().ref('notifications').orderByChild('userID').equalTo(userID).once('value').then(snapshot => {
    let list = [];
    snapshot.forEach(item => {
      list = [...list, item];
    });
    return list;
  })
};

export const updateNotificationStatus = async (
  status,
  userID,
  notificationID,
) => {
  return database().ref('notifications/' + notificationID).update({
    status: status
  });
};

export const insertNotification = async (title, detail, userID) => {
  const ref = database().ref('notifications').push();
  return ref.set({
    title: title,
    detail: detail,
    userID: userID,
  })
};

// User Order

export const getUserOrders = async userID => {
  const ref = database().ref('orders');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem = [];
      snapshot.forEach(item => {
        returnItem = [...returnItem, item.val()];
      });
      return returnItem;
    });
};

export const insertUserOrder = async (
  totalPrice,
  originalPrice,
  note,
  receiver,
  shippingFee,
  paymentType,
  addressID,
  userID,
  couponID,
) => {
  const ref = database.ref('orders');
  ref.set({
    totalPrice: totalPrice,
    originalPrice: originalPrice,
    note: note,
    receiver: receiver,
    shippingFee: shippingFee,
    paymentType: paymentType,
    addressID: addressID,
    userID: userID,
    couponID: couponID,
  })
  
  return true;
};

export const getUserOrderDetail = async userOrderID => {
  return database().ref('userOrders/'+userOrderID).once('value');
};

export const insertUserOrderDetail = async (
  productQuantity,
  userOrderID,
  productID,
) => {
  const ref = database().ref('userOrders').push();
  return ref.set({
    productQuantity: productQuantity,
    userOrderID: userOrderID,
    productID: productID,
  })
};

export const getUserByUsername = async username => {
  const data = {
    username: username,
  };
  const res = await axiosInstance.post('/user/get-user-by-username.php', data);
  return res;
};

export const getUserByEmail = async email => {
  const ref = database().ref('users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      console.log('user', returnItem);
      return returnItem;
    });
};

export const getUserCards = async userID => {
  const ref = database().ref('cards');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem = [];
      snapshot.forEach(item => {
        returnItem = [...returnItem, item.val()];
      });
      console.log('user', returnItem);
      return returnItem;
    });
};
