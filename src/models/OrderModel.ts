class OrderModel {
  id: string | number;
  receiver: string;
  note: string;
  originalPrice: number;
  totalPrice: number;
  shippingFee: number;
  prepareDate: Date;
  pendingDate: Date;
  arrivedDate: Date;
  deliveryDate: Date;
  status: number;
  orderID: number | string;
  couponID: number | string;
  addressID: number | string;

  constructor(
    id: string | number,
    receiver: string,
    note: string,
    originalPrice: number,
    totalPrice: number,
    shippingFee: number,
    prepareDate: Date,
    pendingDate: Date,
    arrivedDate: Date,
    deliveryDate: Date,
    status: number,
    orderID: number | string,
    couponID: number | string,
    addressID: number | string,
  ) {
    this.id = id;
    this.receiver = receiver;
    this.note = note;
    this.originalPrice = originalPrice;
    this.totalPrice = totalPrice;
    this.shippingFee = shippingFee;
    this.prepareDate = prepareDate;
    this.pendingDate = pendingDate;
    this.arrivedDate = arrivedDate;
    this.deliveryDate = deliveryDate;
    this.status = status;
    this.orderID = orderID;
    this.couponID = couponID;
    this.addressID = addressID;
  }
}

export default OrderModel;
