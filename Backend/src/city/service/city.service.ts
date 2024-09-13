import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entity/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  // create une ville
  async create(cityData: any): Promise<{ status: number; message: string }> {
    if (cityData.coordinate && typeof cityData.coordinate === 'string') {
      const coordinates = cityData.coordinate.split(',');
      const lat = coordinates[0].trim();
      const lng = coordinates[1].trim();
      await this.cityRepository
        .createQueryBuilder('city')
        .insert()
        .into(CityEntity)
        .values({
          name: cityData.name,
          address: cityData.address,
          coordinate: () => `ST_GeomFromText('POINT(${lat} ${lng})')`,
        })
        .execute();
      return { status: 201, message: 'City created successfully.' };
    }
  }

  // Get tous les villes
  async findAll(): Promise<{ name: string; address: string; coordinate: any }> {
    return await this.cityRepository
      .createQueryBuilder('city')
      .select(
        'city.id, city.name, city.address, ST_AsText(city.coordinate) as coordinates',
      )
      .execute();
  }

  // get one city by name
  async findOne(
    cityName: string,
  ): Promise<{ name: string; address: string; coordinates: any }> {
    const query = `
      SELECT id, name, address, ST_AsText(coordinate) as coordinates
      FROM city_entity
      WHERE LOWER(name) = LOWER(?)
    `;

    const result = await this.cityRepository.query(query, [cityName.trim()]);

    return result[0];
  }
}
