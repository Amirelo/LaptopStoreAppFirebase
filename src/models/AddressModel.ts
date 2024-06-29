class AddressModel {
    id;
    addressName;
    ward;
    district;
    city;
    status;
    userID;

    constructor(id,
        addressName,
        ward,
        district,
        city,
        status,
        userID) {
        this.id = id
        this.addressName = addressName
        this.ward = ward
        this.district = district
        this.city = city
        this.status = status
        this.userID = userID
    }
}

export default AddressModel