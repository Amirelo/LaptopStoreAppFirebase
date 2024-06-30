class NotificationModel {
  id: string | number;
  title: string;
  detail: string;
  status: number;
  userID: string | number;
  constructor(
    id: string | number,
    title: string,
    detail:string,
    status: number,
    userID: string | number,
  ) {
    this.id = id;
    this.title = title;
    this.detail = detail;
    this.status = status;
    this.userID = userID;
  }
}

export default NotificationModel