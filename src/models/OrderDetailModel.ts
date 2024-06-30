class OrderDetailModel {
  id: string | number;
  productQuantity: number;
  userOrderID: string | number;
  productID: string | number;

  constructor(
    id: string | number,
    productQuantity: number,
    userOrderID: string | number,
    productID: string | number,
  ) {
    this.id = id;
    this.productQuantity = productQuantity;
    this.userOrderID = userOrderID;
    this.productID = productID;
  }
}

export default OrderDetailModel