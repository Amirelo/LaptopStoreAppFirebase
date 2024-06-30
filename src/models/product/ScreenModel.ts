class ScreenModel {
  id: string | number;
  resolution: string;
  screenSize: string;
  status: number;
  constructor(
    id: string | number,
    resolution: string,
    screenSize: string,
    status: number,
  ) {
    this.id = id;
    this.resolution = resolution;
    this.screenSize = screenSize;
    this.status = status;
  }
}

export default ScreenModel;
