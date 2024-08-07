import React, {createContext} from 'react';
import {
  getAllProduct,
  getAllProcessors,
  getAllProductImages,
  getAllMemories,
  getAllScreens,
  getAllStorages,
  getUserCart,
  getProductByID,
  insertCart,
  getCartByEmail,
  getAllOperatingSystems,
  updateCartQuantity,
  getProductImagesByProductID,
  getUserFavorite,
  checkUserFavorite,
  deleteCart,
  insertUserOrder,
  insertOrderDetail,
  getProductProcessor,
  getProductMemory,
  getProductScreen,
  getProductStorage,
  getProductOperatingSystem,
  getProductRatingsByID,
  insertUserRating,
} from './MainService';

export const MainContext = createContext({} as any);

interface Props{
  children: any
}

export const MainContextProvider = (props:Props) => {

  const onGetAllProduct = async () => {
    try {
      const res = await getAllProduct();
      return res;
    } catch (error) {
      console.log('On get all product error', error);
      return null;
    }
  };

  const onGetProductByID = async (productID:any) => {
    try {
      const res = await getProductByID(productID);
      return res;
    } catch (error) {
      console.log('On get product by id error', error);
      return null;
    }
  };

  const onGetAllProductImages = async () => {
    try {
      const res = await getAllProductImages();
      return res;
    } catch (error) {
      console.log('On get all product images error', error);
      return null;
    }
  };

  const onGetProductImagesByProductID = async (productID:any) => {
    try {
      const res = await getProductImagesByProductID(productID);
      return res;
    } catch (error) {
      console.log('On get all product images error', error);
      return null;
    }
  };

  const onGetAllProcessors = async () => {
    try {
      const res = await getAllProcessors();
      return res;
    } catch (error) {
      console.log('On get all processors error', error);
      return null;
    }
  };

  const onGetProductProcessor = async (processorID:any) => {
    try {
      const res = await getProductProcessor(processorID);
      return res;
    } catch (error) {
      console.log('On get product processor error', error);
      return null;
    }
  };

  const onGetAllMemories = async () => {
    try {
      const res = await getAllMemories();
      return res;
    } catch (error) {
      console.log('On get all memories error', error);
      return null;
    }
  };

  const onGetProductMemory = async (memoryID:any) => {
    try {
      const res = await getProductMemory(memoryID);
      return res;
    } catch (error) {
      console.log('On get product memory error', error);
      return null;
    }
  };

  const onGetAllScreens = async () => {
    try {
      const res = await getAllScreens();
      return res;
    } catch (error) {
      console.log('On get all screens error', error);
      return null;
    }
  };

  const onGetProductScreen = async (screenID:any) => {
    try {
      const res = await getProductScreen(screenID);
      return res;
    } catch (error) {
      console.log('On get product screen error', error);
      return null;
    }
  };

  const onGetAllStorages = async () => {
    try {
      const res = await getAllStorages();
      return res;
    } catch (error) {
      console.log('On get all storages error', error);
      return null;
    }
  };

  const onGetProductStorage = async (storageID:any) => {
    try {
      const res = await getProductStorage(storageID);
      return res;
    } catch (error) {
      console.log('On get product processor error', error);
      return null;
    }
  };

  const onGetUserCart = async (username:String) => {
    try {
      const res = await getUserCart(username);
      return res;
    } catch (error) {
      console.log('On get user cart error', error);
      return null;
    }
  };

  const onGetAllOS = async () => {
    try {
      const res = await getAllOperatingSystems();
      return res;
    } catch (error) {
      console.log('On get all OS error', error);
      return null;
    }
  };

  const onGetProductOS = async (operatingSystemID:any) => {
    try {
      const res = await getProductOperatingSystem(operatingSystemID);
      return res;
    } catch (error) {
      console.log('On get product OS error', error);
      return null;
    }
  };

  const onGetUserFavorite = async (userID:any) => {
    try {
      const res = await getUserFavorite(userID);
      return res;
    } catch (error) {
      console.log('On get all user favorite error', error);
      return null;
    }
  };

  const onCheckUserFavorite = async (userID:any, productID:any) => {
    try {
      const res = await checkUserFavorite(userID, productID);
      return res;
    } catch (error) {
      console.log('On check user favorite error', error);
      return null;
    }
  };

  const onInsertCart = async (itemQuantity:number, userID:any, productID:any) => {
    try {
      const res = await insertCart(itemQuantity, userID, productID);
      console.log('On Insert Cart Result:', res);
      return res;
    } catch (error) {
      console.log('On insert cart error', error);
      return null;
    }
  };

  const onGetCartByEmail = async (email:string) => {
    try {
      const res = await getCartByEmail(email);
      console.log('cart result:', res);
      return res;
    } catch (error) {
      console.log('On insert cart error', error);
      return null;
    }
  };

  const onUpdateCartQuantity = async (cartID:any, quantity:number) => {
    try {
      const res = await updateCartQuantity(cartID, quantity);
      return res;
    } catch (error) {
      console.log('On update cart quantity error', error);
      return null;
    }
  };

  const onDeleteCart = async (cartID:any) => {
    try {
      const res = await deleteCart(cartID);
      return res;
    } catch (error) {
      console.log('On delete cart error', error);
      return null;
    }
  };

  const onInsertUserOrder = async (
    totalPrice:number,
    originalPrice:number,
    note:string,
    receiver:string,
    shippingFee:number,
    addressID: any,
    userID: any,
    couponID: any,
    cardID: any,
    cartID: any,
  ) => {
    try {
      const res = await insertUserOrder(
        totalPrice,
        originalPrice,
        note,
        receiver,
        shippingFee,
        addressID,
        userID,
        couponID,
        cardID,
        cartID,
      );
      return true;
    } catch (error) {
      console.log('On insert user order error', error);
      return null;
    }
  };

  const onInsertOrderDetail = async (
    productQuantity: any,
    userOrderID: any,
    productID: any,
    cartID: any,
  ) => {
    try {
      const res = await insertOrderDetail(
        productQuantity,
        userOrderID,
        productID,
        cartID,
      );
      return res;
    } catch (error) {
      console.log('On insert order detail error', error);
      return null;
    }
  };

  const onGetProductRatingsByID = async (productID:any) => {
    try {
      const res = await getProductRatingsByID(productID);
      console.log('On get product rating by id', res);
      return res;
    } catch (error) {
      console.log('On get product rating by id error', error);
      return null;
    }
  };

  const onInsertUserRating = async (rating:number, comment:string, userID:any, productID:any) => {
    try {
      const res = await insertUserRating(rating, comment, userID, productID);
      return res;
    } catch (error) {
      console.log('onInsertUserRating error', error);
      return null;
    }
  };

  return (
    <MainContext.Provider
      value={{
        onGetAllProduct,
        onGetUserCart,
        onGetProductByID,
        onInsertCart,
        onGetCartByEmail,
        onGetAllProductImages,
        onGetAllProcessors,
        onGetAllMemories,
        onGetAllScreens,
        onGetAllStorages,
        onGetAllOS,
        onGetProductProcessor,
        onGetProductMemory,
        onGetProductScreen,
        onGetProductStorage,
        onGetProductOS,
        onGetProductImagesByProductID,
        onUpdateCartQuantity,
        onCheckUserFavorite,
        onGetUserFavorite,
        onDeleteCart,
        onInsertUserOrder,
        onInsertOrderDetail,
        onGetProductRatingsByID,
        onInsertUserRating,
      }}>
      {props.children}
    </MainContext.Provider>
  );
};
