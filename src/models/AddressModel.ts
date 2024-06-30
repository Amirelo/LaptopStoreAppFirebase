class AddressModel {
  id: number | string;
  addressName: string;
  ward: string;
  district: string;
  city: string;
  status: number;
  userID: number | string;

  constructor(
    id: number | string,
    addressName: string,
    ward: string,
    district: string,
    city: string,
    status: number,
    userID: number | string,
  ) {
    this.id = id;
    this.addressName = addressName;
    this.ward = ward;
    this.district = district;
    this.city = city;
    this.status = status;
    this.userID = userID;
  }
}

export default AddressModel;
