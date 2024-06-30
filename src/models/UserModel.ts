class UserModel {
  id: string | Number;
  username: string;
  userPassword: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  imageLink: string;
  birthday: string;
  createDate: string;
  gender: string;
  accountStatus: number;

  constructor(
    id: string | Number,
    username: string,
    userPassword: string,
    email: string,
    phoneNumber: string,
    fullName: string,
    imageLink: string,
    birthday: string,
    createDate: string,
    gender: string,
    accountStatus: number,
  ) {
    this.id = id;
    this.username = username;
    this.userPassword = userPassword;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.imageLink = imageLink;
    this.birthday = birthday;
    this.createDate = createDate;
    this.gender = gender;
    this.accountStatus = accountStatus;
  }
}

export default UserModel