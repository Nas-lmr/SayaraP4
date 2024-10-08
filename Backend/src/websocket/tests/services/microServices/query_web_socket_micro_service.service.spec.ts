import { Test, TestingModule } from '@nestjs/testing';
import {QueryWebSocketMicroService} from "../../../services/microServices/QueryWebSocketMicroService.service";

describe('QueryWebSocketMicroService', () => {
  let service: QueryWebSocketMicroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryWebSocketMicroService],
    }).compile();

    service = module.get<QueryWebSocketMicroService>(QueryWebSocketMicroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
