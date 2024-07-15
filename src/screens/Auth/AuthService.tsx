import database, { FirebaseDatabaseTypes, firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import AddressModel from '../../models/AddressModel';


// User
export const signIn = async (username:string, password:string) => {
  const ref = database().ref('/users');
  const res = await ref
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach((item:any) => {
        if (item.val().password == password) {
          console.log('Login success');
          returnItem = item.val();
          return true
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

const anonymousSignIn = async() => {

}

export const signUp = async (
  username:String,
  password:String,
  email:String,
  phoneNumber:String,
  fullName:String,
  birthday:String,
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

export const checkEmail = async (email:string) => {
  const ref = database().ref('/users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then((snapshot) => {
      const exist = snapshot.val() != null

      return exist;
    });
};

export const checkUserName = async (username:String) => {
  const ref = database().ref('users');
  return ref.once('value').then(snapshot => {
    let isUsed = false;
    snapshot.forEach((item: any) => {
      if (item.username.toLowerCase() == username.toLowerCase()) {
        isUsed = true;
      }
      return true;
    });
    return isUsed;
  })
}

export const updateUserFullname = async (data:string, email:string) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach((item:any) => {
        return item.ref.update({
          fullname: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserPhoneNumber = async (data:string, email:string) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach((item:any) => {
        return item.ref.update({
          phonenumber: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserBirthday = async (data:string, email:string) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach((item:any) => {
        return item.ref.update({
          birthday: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserPassword = async (data:string, email:string) => {
  const ref = database().ref('users')

  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach((item:any) => {
        return item.ref.update({
          password: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const updateUserImage = async (data:string, email:string) => {
  const ref = database().ref('users')
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      snapshot.forEach((item:any) => {
        return item.ref.update({
          imageLink: data
        }).then(() => console.log('Updated'));
      })
      return true;
    })
};

export const getAddressesByEmail = async (email:string) => {
  const ref = database().ref('users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(async snapshot => {
      let user = null;
      let returnItem: Array<any> = [];
      snapshot.forEach((item:any) => {
        return user = item.val();
      });
      const addressRef = database().ref('addresses');
      return await addressRef
        .orderByChild('userID')
        .equalTo(user!.userID)
        .once('value')
        .then(snapshot2 => {
          snapshot2.forEach((curItem:any) => {
            returnItem = [...returnItem, curItem.val()];
            return true
          });
          return returnItem;
        });
    });
};

export const insertAddress = async (
  address:AddressModel
) => {
  const ref = database().ref('addresses');
  const newRef = ref.push();

  newRef.set({
    addressID: newRef.key,
    addressName: address.addressName,
    ward: address.ward,
    district: address.district,
    city: address.city,
    status: address.status,
    userID: address.userID
  }).then(() => console.log('Address Inserted'))


  return true;
};

export const updateAddressInfo = async (address:AddressModel) => {
  const ref = database().ref('addresses/' + address.id);
  await ref.update({
    addressName: address.addressName,
    ward: address.ward,
    district: address.district,
    city: address.city,
    status: address.status,
  })
  return true;
};

// Coupon

export const getUserCoupon = async (userID:any) => {
  const ref = database().ref('coupons');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem:Array<any> = [];
      snapshot.forEach((item:any) => {
        returnItem = [...returnItem, item.val()];
        return true
      });
      return returnItem;
    });
};

// Favorite
export const getUserFavorite = async (userID:any) => {
  const ref = database().ref('favorites');
  const res = ref.orderByChild('userID').equalTo(userID).once('value').then(() => {
    console.log('get success');
  })
  return res;
};

export const updateUserFavoriteStatus = async (
  favoriteID:any,
  userID:any,
  isFavorite: boolean,
) => {
  const ref = database().ref('favorites/' + favoriteID);
  return ref.update({
    isFavorite: isFavorite
  })
};

// Rating

export const getUserAllRatings = async (userID:any) => {
  return database().ref('ratings').orderByChild('userID').equalTo(userID).once('value').then(snapshot => {
    let list:Array<any> = [];
    snapshot.forEach((item:any) => {
      list = [...list, item];
      return true
    })
    return list;
  })
};

export const updateUserRating = async (
  ratingID:any,
  rating:number,
  comment:string,
  status:boolean,
  userID:any,
  productID:any,
) => {
  return database().ref('ratings/' + ratingID).update({
    rating: rating,
    comment: comment,
    status: status,
  })
};

export const updateUserRatingStatus = async (ratingID:any, userID:any, status:boolean) => {
  return database().ref('ratings/' + ratingID).update({
    status: status,
  })
};

export const getRatingImage = async () => {
  return database().ref('ratingImages').once('value');
};

export const getRatingImageByRatingID = async (ratingID:any) => {
  return database().ref('ratingImages').orderByChild('ratingID').equalTo(ratingID).once('value').then(snapshot => {
    let list:Array<any> = [];
    snapshot.forEach((item:any) => {
      list = [...list, item];
      return true
    })
    return list;
  })
};

export const getUserNotification = async (userID:any) => {
  return database().ref('notifications').orderByChild('userID').equalTo(userID).once('value').then(snapshot => {
    let list:any = [];
    snapshot.forEach((item:any) => {
      list = [...list, item.val()];
      return true;
    });
    return list;
  })
};

export const updateNotificationStatus = async (
  status:number,
  notificationID:any,
) => {
  try{
    await database().ref('notifications/' + notificationID).update({
      status: status
    });
    return true

  } catch(error) {
    console.log("Error updating notification status: ", error)
  }
};

export const insertNotification = async (title:string, detail:string, userID:any) => {
  const ref = database().ref('notifications').push();
  return ref.set({
    title: title,
    detail: detail,
    userID: userID,
  })
};

// User Order

export const getUserOrders = async (userID:any) => {
  const ref = database().ref('orders');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem:Array<any> = [];
      snapshot.forEach((item:any) => {
        returnItem = [...returnItem, item.val()];
        return true
      });
      return returnItem;
    });
};

export const insertUserOrder = async (
  totalPrice:number,
  originalPrice:number,
  note:string,
  receiver:string,
  shippingFee:number,
  paymentType:any,
  addressID:any,
  userID:any,
  couponID:any,
) => {
  const ref = database().ref('orders');
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

export const getUserOrderDetail = async (orderID:string) => {
  const res = await database().ref('orderDetails').orderByChild('orderID').equalTo(orderID).once('value').then(snapshot => {
    var list:Array<any> = []
    snapshot.forEach((item:any) => {
      list = [...list, item.val()]
      return true
    })
    return list;
  });
  console.log('order detail res:', res);
  return res;
};

export const insertUserOrderDetail = async (
  productQuantity:number,
  orderID:any,
  productID:any,
) => {
  const ref = database().ref('orders').push();
  return ref.set({
    productQuantity: productQuantity,
    orderID: orderID,
    productID: productID,
  })
};

export const getUserByEmail = async (email:string) => {
  const ref = database().ref('users');
  return await ref
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach((item:any) => {
        returnItem = item.val();
        return true
      });
      console.log('user', returnItem);
      return returnItem;
    });
};

export const getUserCards = async (userID:any) => {
  const ref = database().ref('cards');
  return await ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let returnItem:Array<any> = [];
      snapshot.forEach((item: any) => {
        returnItem = [...returnItem, item.val()];
        return true
      });
      console.log('user', returnItem);
      return returnItem;
    });
};
