class ProcessorModel {
  id: string | number;
  name: string;
  cores: number;
  processsor: number;
  CPU_speed: number;
  cacheMemory: number;
  status: number;
  constructor(
    id: string | number,
    name: string,
    cores: number,
    processsor: number,
    CPU_speed: number,
    cacheMemory: number,
    status: number,
  ) {
    this.id = id;
    this.name = name;
    this.cores = cores;
    this.processsor = processsor;
    this.CPU_speed = CPU_speed;
    this.cacheMemory = cacheMemory;
    this.status = status;
  }
}

export default ProcessorModel;
