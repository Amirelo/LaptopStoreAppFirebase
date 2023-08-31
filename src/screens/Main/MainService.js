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
      return snapshot.val();
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
  return await ref
    .orderByChild('productID')
    .equalTo(productID)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
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
  const data = {
    itemQuantity: itemQuantity,
    userID: userID,
    productID: productID,
  };
  const res = await axiosInstance.post('/cart/insert-cart-info.php', data);
  return res;
};

export const getCartByEmail = async email => {
  const data = {
    email: email,
  };
  const res = await axiosInstance.post('/cart/get-carts-by-email.php', data);
  return res;
};

export const updateCartQuantity = async (cartID, quantity) => {
  const data = {
    cartID: cartID,
    itemQuantity: quantity,
  };
  const res = await axiosInstance.post('/cart/update-cart-quantity.php', data);
  return res;
};

export const deleteCart = async cartID => {
  const data = {
    cartID: cartID,
  };
  const res = await axiosInstance.post('/cart/delete-cart-by-id.php', data);
  return res;
};

export const getUserFavorite = async userID => {
  const data = {
    userID: userID,
  };
  const res = await axiosInstance.post('/favorite/get-user-favorite.php', data);
  return res;
};

export const checkUserFavorite = async (userID, productID) => {
  const data = {
    userID: userID,
    productID: productID,
  };
  const res = await axiosInstance.post(
    '/favorite/check-user-favorite.php',
    data,
  );
  return res;
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
  const data = {
    totalPrice: totalPrice,
    originalPrice: originalPrice,
    note: note,
    receiver: receiver,
    shippingFee: shippingFee,
    addressID: addressID,
    userID: userID,
    couponID: couponID,
    cardID: cardID,
  };
  const res = await axiosInstance.post(
    '/userOrder/insert-user-order.php',
    data,
  );
  return res;
};
export const insertOrderDetail = async (
  productQuantity,
  userOrderID,
  productID,
  cartID,
) => {
  const data = {
    productQuantity: productQuantity,
    userOrderID: userOrderID,
    productID: productID,
    cartID: cartID,
  };
  const res = await axiosInstance.post(
    '/orderDetail/insert-order-detail.php',
    data,
  );
  return res;
};

export const getProductRatingsByID = async productID => {
  const data = {
    productID: productID,
  };
  const res = await axiosInstance.post('/rating/get-product-ratings.php', data);
  return res;
};

export const insertUserRating = async (rating, comment, userID, productID) => {
  const data = {
    rating: rating,
    comment: comment,
    userID: userID,
    productID: productID,
  };
  const res = await axiosInstance.post('/rating/insert-rating.php', data);
  return res;
};
