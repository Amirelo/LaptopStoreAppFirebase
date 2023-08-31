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
  const data = {
    productID: productID,
  };
  const res = await axiosInstance.post('/product/get-product-by-id.php', data);
  return res;
};

export const getAllProductImages = async () => {
  const res = await axiosInstance.get(
    '/productImage/get-all-product-images.php',
  );
  return res;
};

export const getProductImagesByProductID = async productID => {
  const data = {
    productID: productID,
  };
  const res = await axiosInstance.post(
    '/productImage/get-product-images-by-product-id.php',
    data,
  );
  return res;
};

// Product Specs

export const getAllBrands = async () => {
  const res = await axiosInstance.get('/brand/get-all-brands.php');
  return res;
};

export const getAllScreens = async () => {
  const res = await axiosInstance.get('/screen/get-all-screens.php');
  return res;
};

export const getProductScreen = async screenID => {
  const data = {
    screenID: screenID,
  };
  const res = await axiosInstance.post('/screen/get-screen-by-id.php', data);
  return res;
};

export const getAllOperatingSystems = async () => {
  const res = await axiosInstance.get(
    '/operatingSystem/get-all-operating-systems.php',
  );
  return res;
};

export const getProductOperatingSystem = async operatingSystemID => {
  const data = {
    operatingSystemID: operatingSystemID,
  };
  const res = await axiosInstance.post(
    '/operatingSystem/get-operating-system-by-id.php',
    data,
  );
  return res;
};

export const getAllProcessors = async () => {
  const res = await axiosInstance.get('/processor/get-all-processors.php');
  return res;
};

export const getProductProcessor = async processorID => {
  const data = {
    processorID: processorID,
  };
  const res = await axiosInstance.post(
    '/processor/get-processor-by-id.php',
    data,
  );
  return res;
};

export const getAllMemories = async () => {
  const res = await axiosInstance.get('/memory/get-all-memories.php');
  return res;
};

export const getProductMemory = async memoryID => {
  const data = {
    memoryID: memoryID,
  };
  const res = await axiosInstance.post('/memory/get-memory-by-id.php', data);
  return res;
};

export const getAllStorages = async () => {
  const res = await axiosInstance.get('/storage/get-all-storages.php');
  return res;
};

export const getProductStorage = async storageID => {
  const data = {
    storageID: storageID,
  };
  const res = await axiosInstance.post('storage/get-storage-by-id.php', data);
  return res;
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
