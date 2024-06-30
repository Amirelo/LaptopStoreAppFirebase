class ProductModel {
  productID: string | number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  releasedDate: string;
  totalRating: number;
  modelCode: string;
  onSale: string;
  currentPrice: number;
  manufacturer: string;
  warranty: number;
  sold: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  status: number;
  productImageLink: string;
  brandID: string | number;
  screenID: string | number;
  operatingSystemID: string | number;
  processorID: string | number;
  memoryID: string | number;
  storageID: string | number;

  constructor(
    productID: string | number,
    productName: string,
    productPrice: number,
    productQuantity: number,
    releasedDate: string,
    totalRating: number,
    modelCode: string,
    onSale: string,
    currentPrice: number,
    manufacturer: string,
    warranty: number,
    sold: number,
    length: number,
    width: number,
    height: number,
    weight: number,
    status: number,
    productImageLink: string,
    brandID: string | number,
    screenID: string | number,
    operatingSystemID: string | number,
    processorID: string | number,
    memoryID: string | number,
    storageID: string | number,
  ) {
    this.productID = productID;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
    this.releasedDate = releasedDate;
    this.totalRating = totalRating;
    this.modelCode = modelCode;
    this.onSale = onSale;
    this.currentPrice = currentPrice;
    this.manufacturer = manufacturer;
    this.warranty = warranty;
    this.sold = sold;
    this.length = length;
    this.width = width;
    this.height = height;
    this.weight = weight;
    this.status = status;
    this.productImageLink = productImageLink;
    this.brandID = brandID;
    this.screenID = screenID;
    this.operatingSystemID = operatingSystemID;
    this.processorID = processorID;
    this.memoryID = memoryID;
    this.storageID = storageID;
  }
}

export default ProductModel;
