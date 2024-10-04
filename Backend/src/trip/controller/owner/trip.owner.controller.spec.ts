import { Test, TestingModule } from '@nestjs/testing';
import { TripOwnerController } from './trip.owner.controller';

describe('TripOwnerController', () => {
  let controller: TripOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripOwnerController],
    }).compile();

    controller = module.get<TripOwnerController>(TripOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
