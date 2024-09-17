import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { UserService } from "src/user/service/user.service";
import { Repository } from "typeorm";
import { TripDto } from "../dto/trip.dto";
import { TripEntity } from "../entity/trip.entity";

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,

    // private readonly cityService: CityService,
    private readonly userService: UserService
  ) {}

  // async create(tripDto: TripDto, ownerId: OwnerIdDTO): Promise<TripEntity> {
  //   // Récupérer l'utilisateur par ownerId
  //   const owner = await this.userService.findById(ownerId.ownerID);
  //   if (!owner) {
  //     throw new NotFoundException("Owner not found");
  //   }

  //   // Récupérer la ville de départ via CityService
  //   const departureCity = await this.cityService.findById(
  //     tripDto.departureCityId
  //   );
  //   if (!departureCity) {
  //     throw new NotFoundException("Departure city not found");
  //   }

  //   // Récupérer la ville de destination via CityService
  //   const destinationCity = await this.cityService.findById(
  //     tripDto.destinationCityId
  //   );
  //   if (!destinationCity) {
  //     throw new NotFoundException("Destination city not found");
  //   }

  //   console.log("Owner:", owner);
  //   console.log("Departure City:", departureCity);
  //   console.log("Destination City:", destinationCity);
  //   console.log("Trip Data:", tripDto);

  //   // Création de l'entité Trip
  //   const trip = this.tripRepository.create({
  //     owner,
  //     departureCity,
  //     destinationCity,
  //     availableSeats: tripDto.availableSeats,
  //     pricePerSeat: tripDto.pricePerSeat,
  //     departureDate: tripDto.departureDate,
  //     departureTime: tripDto.departureTime,
  //   });
  //   console.log("TRIP:", trip);

  //   // Enregistrer le voyage dans la base de données
  //   return await this.tripRepository.save(trip);
  // }

  async create(
    tripData: TripDto
  ): Promise<{ status: number; message: string }> {
    try {
      const owner = await this.userService.findById(tripData.owner);
      if (!owner) {
        return { status: 400, message: "Owner not found." };
      }

      const departureCityQuery = `
        SELECT id
        FROM city_entity
        WHERE id = ?
      `;
      const [departureCityResult] = await this.cityRepository.query(
        departureCityQuery,
        [tripData.departure_city_id]
      );
      console.log(
        [tripData.departure_city_id],
        "DEPARTURECTIYRESULT SERVICE BACK"
      );

      if (!departureCityResult) {
        return { status: 400, message: "Departure city not found." };
      }

      const destinationCityQuery = `
        SELECT id
        FROM city_entity
        WHERE id = ?
      `;
      const [destinationCityResult] = await this.cityRepository.query(
        destinationCityQuery,
        [tripData.destination_city_id]
      );

      if (!destinationCityResult) {
        return { status: 400, message: "Destination city not found." };
      }
      console.log("SERVICE BACKEND Trip data received:", tripData);

      const dateTimeFormat = (date, time) => {
        const [day, mounth, year] = date.split("/");
        const [hour, minute] = time.split(" h ");

        return `${year}-${mounth}-${day} ${hour}:${minute}:00`;
      };

      const trip = this.tripRepository.create({
        availableSeats: tripData.availableSeats,
        pricePerSeat: tripData.pricePerSeat,
        departureDateTime: dateTimeFormat(
          tripData.departureDate,
          tripData.departureTime
        ),
        owner,
        departureCity: departureCityResult.id,
        destinationCity: destinationCityResult.id,
      });

      await this.tripRepository.save(trip);

      return { status: 201, message: "Trip created successfully." };
    } catch (error) {
      console.error("Error creating trip:", error);
      return {
        status: 500,
        message: "An error occurred while creating the trip.",
      };
    }
  }
}
