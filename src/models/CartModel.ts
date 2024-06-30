class CartModel {
  id: number | string;
  itemQuantity: number;
  productID: number | string;
  userID: number | string;
  constructor(
    id: number | string,
    itemQuantity: number,
    productID: number | string,
    userID: number | string,
  ) {
    this.id = id;
    this.itemQuantity = itemQuantity;
    this.productID = productID;
    this.userID = userID;
  }
}

export default CartModel;
