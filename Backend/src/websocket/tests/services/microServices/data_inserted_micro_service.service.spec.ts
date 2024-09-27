import { Test, TestingModule } from '@nestjs/testing';
import {DataInsertedMicroService} from "../../../services/microServices/DataInsertedMicroService";

describe('DataInsertedMicroService', () => {
  let service: DataInsertedMicroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInsertedMicroService],
    }).compile();

    service = module.get<DataInsertedMicroService>(DataInsertedMicroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
