class CommentModel {
  id: string | number;
  comment: String;
  dateAdded: Date;
  rating: number;
  status: boolean;
  userID: string | number;
  productID: string | number;

  constructor(
    id: string | number,
    comment: String,
    dateAdded: Date,
    rating: number,
    status: boolean,
    userID: string | number,
    productID: string | number,
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
