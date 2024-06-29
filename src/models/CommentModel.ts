class CommentModel {
  id: String;
  comment: String;
  dateAdded: Date;
  rating: number;
  status: boolean;
  userID: String;
  productID: String;

  constructor(
    id: String,
    comment: String,
    dateAdded: Date,
    rating: number,
    status: boolean,
    userID: String,
    productID: String,
  ) {
    this.id = id;
    this.comment = comment;
    this.dateAdded = dateAdded;
    this.rating = rating;
    this.status = status;
    this.userID = userID;
    this.productID = productID;
  }
}
