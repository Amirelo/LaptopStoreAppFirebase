class StorageModel {
  id: string | number;
  currentStorage: string;
  maxSlots: number;
  type: string;
  status: number;
  constructor(
    id: string | number,
    currentStorage: string,
    maxSlots: number,
    type: string,
    status: number,
  ) {
    this.id = id;
    this.currentStorage = currentStorage;
    this.maxSlots = maxSlots;
    this.type = type;
    this.status = status;
  }
}

export default StorageModel;
