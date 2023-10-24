import { axiosInstance } from '../../utils/axios';
import database from '@react-native-firebase/database';

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
  const data = {
    email: email,
  };
  const res = await axiosInstance.post(
    '/user/send-verification-code.php',
    data,
  );
  return res;
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
      if (
        (returnItem == null && type == 'SIGNUP') ||
        (returnItem != null && type == 'CHANGEPASSWORD')
      ) {
        return true;
      } else {
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
  const data = {
    addressName: addressName,
    ward: ward,
    district: district,
    city: city,
    status: status,
    userID: userID,
  };
  const res = await axiosInstance.post('/address/insert-address.php', data);
  return res;
};

export const updateAddressInfo = async (data, type, addressID, userID) => {
  const data1 = {
    data: data,
    type: type,
    addressID: addressID,
    userID: userID,
  };
  const res = await axiosInstance.post(
    '/address/update-address-info.php',
    data1,
  );
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
  const data = {
    userID: userID,
  };
  const res = await axiosInstance.post('/favorite/get-user-favorite.php', data);
  return res;
};

export const updateUserFavoriteStatus = async (
  favoriteID,
  userID,
  isFavorite,
) => {
  const data = {
    favoriteID: favoriteID,
    userID: userID,
    isFavorite: isFavorite,
  };
  const res = await axiosInstance.post(
    '/favorite/update-favorite-status.php',
    data,
  );
  return res;
};

// Rating

export const getUserAllRatings = async userID => {
  const data = {
    userID: userID,
  };
  const res = await axiosInstance.post(
    '/rating/get-ratings-by-userid.php',
    data,
  );
  return res;
};

export const updateUserRating = async (
  ratingID,
  rating,
  comment,
  status,
  userID,
  productID,
) => {
  const data = {
    ratingID: ratingID,
    rating: rating,
    comment: comment,
    status: status,
    userID: userID,
    productID: productID,
  };
  const res = await axiosInstance.post('/rating/update-user-rating.php', data);
  return res;
};

export const updateUserRatingStatus = async (ratingID, userID, status) => {
  const data = {
    ratingID: ratingID,
    userID: userID,
    status: status,
  };
  const res = await axiosInstance.post(
    '/rating/update-user-rating-status.php',
    data,
  );
  return res;
};

export const getRatingImage = async () => {
  const res = await axiosInstance.get('/ratingImage/get-all-rating-images.php');
  return res;
};

export const getRatingImageByRatingID = async ratingID => {
  const data = {
    ratingID: ratingID,
  };
  const res = await axiosInstance.post(
    '/ratingImage/get-rating-images-by-rating-id.php',
    data,
  );
  return res;
};

export const getUserNotification = async userID => {
  const data = {
    userID: userID,
  };
  const res = await axiosInstance.post(
    '/notification/get-user-notifications.php',
    data,
  );
  return res;
};

export const updateNotificationStatus = async (
  status,
  userID,
  notificationID,
) => {
  const data = {
    status: status,
    userID: userID,
    notificationID: notificationID,
  };
  const res = await axiosInstance.post(
    '/notification/update-notification-status.php',
    data,
  );
  return res;
};

export const insertNotification = async (title, detail, userID) => {
  const data = {
    title: title,
    detail: detail,
    userID: userID,
  };
  const res = await axiosInstance.post(
    '/notification/insert-notification.php',
    data,
  );
  return res;
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
  const data = {
    totalPrice: totalPrice,
    originalPrice: originalPrice,
    note: note,
    receiver: receiver,
    shippingFee: shippingFee,
    paymentType: paymentType,
    addressID: addressID,
    userID: userID,
    couponID: couponID,
  };
  const res = await axiosInstance.post(
    '/userOrder/insert-user-order.php',
    data,
  );
  return res;
};

export const getUserOrderDetail = async userOrderID => {
  const data = {
    userOrderID: userOrderID,
  };
  const res = await axiosInstance.post(
    '/orderDetail/get-user-order-detail.php',
    data,
  );
  return res;
};

export const insertUserOrderDetail = async (
  productQuantity,
  userOrderID,
  productID,
) => {
  const data = {
    productQuantity: productQuantity,
    userOrderID: userOrderID,
    productID: productID,
  };
  const res = await axiosInstance.post(
    '/orderDetail/insert-order-detail.php',
    data,
  );
  return res;
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
