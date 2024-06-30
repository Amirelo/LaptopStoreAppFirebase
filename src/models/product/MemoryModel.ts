class MemoryModel {
  id: string | number;
  availableSlots: number;
  maxSlots: number;
  currentRAM: string;
  maxRAM: string;
  speed: string;
  status: number;
  type: string;

  constructor(
    id: string | number,
    availableSlots: number,
    maxSlots: number,
    currentRAM: string,
    maxRAM: string,
    speed: string,
    status: number,
    type: string,
  ) {
    this.id = id;
    this.availableSlots = availableSlots;
    this.maxSlots = maxSlots;
    this.currentRAM = currentRAM;
    this.maxRAM = maxRAM;
    this.speed = speed;
    this.status = status;
    this.type = type;
  }
}

export default MemoryModel;
