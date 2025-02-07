import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { Repository } from 'typeorm';
import { CityEntity } from '../entity/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a city successfully', async () => {
      const cityData = { name: 'Paris', address: 'France', coordinate: '48.8566, 2.3522' };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        into: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
      } as any);

      const result = await service.create(cityData);

      expect(result).toEqual({ status: 201, message: 'City created successfully.' });
    });
  });

  describe('findAll', () => {
    it('should return a list of cities', async () => {
      const mockCities = [
        { id: 1, name: 'Paris', address: 'France', coordinates: 'POINT(48.8566 2.3522)' },
        { id: 2, name: 'London', address: 'UK', coordinates: 'POINT(51.5074 -0.1278)' },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(mockCities),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(mockCities);
    });
  });

  describe('findOne', () => {
    it('should return a city by name', async () => {
      const cityName = 'Paris';
      const mockCity = {
        id: 1,
        name: 'Paris',
        address: 'France',
        coordinates: 'POINT(48.8566 2.3522)',
      };

      jest.spyOn(repository, 'query').mockResolvedValue([mockCity]);

      const result = await service.findOne(cityName);
      expect(result).toEqual(mockCity);
    });

    it('should return undefined if city is not found', async () => {
      jest.spyOn(repository, 'query').mockResolvedValue([]);

      const result = await service.findOne('UnknownCity');
      expect(result).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should return a city by ID', async () => {
      const cityId = 1;
      const mockCity = {
        id: 1,
        name: 'Paris',
        address: 'France',
        coordinates: 'POINT(48.8566 2.3522)',
      };

      jest.spyOn(repository, 'query').mockResolvedValue([mockCity]);

      const result = await service.findById(cityId);
      expect(result).toEqual([mockCity]);
    });

    it('should return undefined if city ID does not exist', async () => {
      jest.spyOn(repository, 'query').mockResolvedValue([]);

      const result = await service.findById(999);
      expect(result).toEqual([]);
    });
  });
});
