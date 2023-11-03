import {axiosInstance} from '../../utils/axios';
import database from '@react-native-firebase/database';
// Product
export const getAllProduct = async () => {
  const ref = database().ref('products');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductByID = async productID => {
  const ref = database().ref('products');
  return await ref
    .orderByChild('productID')
    .equalTo(productID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getAllProductImages = async () => {
  const ref = database().ref('productImages');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductImagesByProductID = async productID => {
  const ref = database().ref('productImages');
  let returnItem = [];
  return await ref
    .orderByChild('productID')
    .equalTo(productID)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        returnItem = [...returnItem, item.val()];
      });
      return returnItem;
    });
};

// Product Specs

export const getAllBrands = async () => {
  const ref = database().ref('brands');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getAllScreens = async () => {
  const ref = database().ref('screens');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductScreen = async screenID => {
  const ref = database().ref('screens');
  return await ref
    .orderByChild('screenID')
    .equalTo(screenID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getAllOperatingSystems = async () => {
  const ref = database().ref('operatingSystems');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductOperatingSystem = async operatingSystemID => {
  const ref = database().ref('operatingSystems');
  return await ref
    .orderByChild('operatingSystemID')
    .equalTo(operatingSystemID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getAllProcessors = async () => {
  const ref = database().ref('processors');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductProcessor = async processorID => {
  const ref = database().ref('processors');
  return await ref
    .orderByChild('processorID')
    .equalTo(processorID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getAllMemories = async () => {
  const ref = database().ref('memories');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductMemory = async memoryID => {
  const ref = database().ref('memories');
  return await ref
    .orderByChild('memoryID')
    .equalTo(memoryID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getAllStorages = async () => {
  const ref = database().ref('storages');
  return await ref.once('value').then(snapshot => {
    return snapshot.val();
  });
};

export const getProductStorage = async storageID => {
  const ref = database().ref('storages');
  return await ref
    .orderByChild('storageID')
    .equalTo(storageID)
    .once('value')
    .then(snapshot => {
      let returnItem = null;
      snapshot.forEach(item => {
        returnItem = item.val();
      });
      return returnItem;
    });
};

export const getUserCart = async username => {
  const data = {
    username: username,
  };
  const res = await axiosInstance.post('/cart/get-carts-by-username.php', data);
  return res;
};

export const insertCart = async (itemQuantity, userID, productID) => {
  const newRef = database().ref('/carts').push();
  return newRef
    .set({
      cartID: newRef.key,
      itemQuantity: itemQuantity,
      userID: userID,
      productID: productID,
    })
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export const getCartByEmail = async email => {
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
      if (returnItem != null) {
        console.log(returnItem.userID);
        const cartRef = database().ref('carts');
        return cartRef
          .orderByChild('userID')
          .equalTo(returnItem.userID)
          .once('value')
          .then(snapshot => {
            let returnData = [];
            console.log('userdata', snapshot.val());
            snapshot.forEach(item => {
              returnData = [...returnData, item.val()];
            });
            return returnData;
          });
      }
    });
};

export const updateCartQuantity = async (cartID, quantity) => {
  const ref = database().ref('carts');
  return ref.orderByChild('cartID').equalTo(cartID).once('value').then(snapshot=>{
    snapshot.forEach(item => {
      item.ref.update({
        itemQuantity: quantity,
      })
    })
  });
};

export const deleteCart = async cartID => {
  const ref = database().ref('carts');
  return ref
    .orderByChild('cartID')
    .equalTo(cartID)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(async item => {
        await item.ref.remove();
      });
      return true;
    }).catch(error => {
      console.log(error)
      return false;
    });
};

export const getUserFavorite = async userID => {
  const ref = database().ref('favorites');
  return ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let list = []
      snapshot.forEach(item => {
        list = [...list, item.val()];
      })
      return list;
    });
};

export const insertUserFavorite = async (userID, productID) => {
  const ref = database().ref('favorites').push();
  return ref
    .set({
      favoriteID: ref.key,
      isFavorite: true,
      productID: productID,
      userID: userID,
    })
    .then(() => {
      console.log("Insert completed")
      return true;
    })
    .catch(error => {
      console.log(error);
    });
};

export const checkUserFavorite = async (userID, productID) => {
  const ref = database().ref('favorites');
  return ref
    .orderByChild('userID')
    .equalTo(userID)
    .once('value')
    .then(snapshot => {
      let data = [];
      console.log('userdata', snapshot.val());
      snapshot.forEach(item => {
        if (item.productID == productID) {
          data = [...data, item.val()];
        }
      });
      console.log('Favorite found or not:', data)
      if (data[0] != null) {
        return true;
      } else {
        return insertUserFavorite(userID, productID);
      }
    });
};

export const insertUserOrder = async (
  totalPrice,
  originalPrice,
  note,
  receiver,
  shippingFee,
  addressID,
  userID,
  couponID,
  cardID,
) => {
  const ref = database().ref('userOrders').push();
  return ref.set({
    userOrderID: ref.key,
    totalPrice: totalPrice,
    originalPrice: originalPrice,
    note: note,
    receiver: receiver,
    shippingFee: shippingFee,
    addressID: addressID,
    userID: userID,
    couponID: couponID,
    cardID: cardID,
  })
};

export const insertOrderDetail = async (
  productQuantity,
  userOrderID,
  productID,
  cartID,
) => {
  const data = {
    
  };
  const ref = database().ref('orderDetails').push;
  return ref.set({
    orderDetailID: ref.key,
    productQuantity: productQuantity,
    userOrderID: userOrderID,
    productID: productID,
    cartID: cartID,
  })
};

export const getProductRatingsByID = async productID => {
  const ref = database().ref('ratings');
  return ref.orderByChild('productID').equalTo(productID).then(snapshot=> {
    let list = [];
    snapshot.forEach(item => {
      list = [...list, item];
    })
    return list;
  })
};

export const insertUserRating = async (rating, comment, userID, productID) => {
  const ref = database().ref('ratings').push();
  return ref.set({
    ratingID: ref.key,
    rating: rating,
    comment: comment,
    userID: userID,
    productID: productID,
  })
};
