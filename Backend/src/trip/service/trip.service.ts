import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OwnerIdDTO } from "src/user/dto/user.dto";
import { Repository } from "typeorm";
import { TripDto } from "../dto/trip.dto";
import { TripEntity } from "../entity/trip.entity";
import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>
  ) {}

  async create(tripDto: TripDto, ownerId: OwnerIdDTO): Promise<TripEntity> {
    // Récupérer l'utilisateur par ownerId
    const owner = await this.userRepository.findOne({
      where: { id: ownerId.ownerID },
    });
    if (!owner) {
      throw new NotFoundException("Owner not found");
    }

    // Récupérer la ville de départ par l'identifiant dans tripDto
    const departureCity = await this.cityRepository.findOne({
      where: { id: tripDto.departureCityId },
    });
    if (!departureCity) {
      throw new NotFoundException("Departure city not found");
    }

    // Récupérer la ville de destination par l'identifiant dans tripDto
    const destinationCity = await this.cityRepository.findOne({
      where: { id: tripDto.destinationCityId },
    });
    if (!destinationCity) {
      throw new NotFoundException("Destination city not found");
    }

    const trip = new TripEntity();
    trip.owner = owner;
    trip.departureCity = departureCity;
    trip.destinationCity = destinationCity;
    trip.availableSeats = tripDto.availableSeats;
    trip.pricePerSeat = tripDto.pricePerSeat;
    trip.departureDate = tripDto.departureDate;
    trip.departureTime = tripDto.departureTime;

    const savedTrip = await this.tripRepository.save(trip);
    return savedTrip;
  }
}
