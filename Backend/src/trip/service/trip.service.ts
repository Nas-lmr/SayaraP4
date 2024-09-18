import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
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
    private readonly cityRepository: Repository<CityEntity>
  ) {}

  async create(
    tripData: TripDto
  ): Promise<{ status: number; message: string }> {
    try {
      const owner = await this.userRepository.findOneBy({ id: tripData.owner });
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
      // function to convert the date and time mysql date time
      const dateTimeFormat = (date, time) => {
        const [day, mounth, year] = date.split("/");
        const [hour, minute] = time.split(" h ");

        return `${year}-${mounth}-${day} ${hour}:${minute}:00`;
      };

      const trip = this.tripRepository.create({
        availableSeats: tripData.availableSeats,
        pricePerSeat: tripData.pricePerSeat,
        distance: tripData.distance,
        duration: tripData.duration,
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

  async GetAll(): Promise<any[]> {
    return await this.tripRepository
      .createQueryBuilder("trip")
      .innerJoinAndSelect("trip.departureCity", "departureCity")
      .innerJoinAndSelect("trip.destinationCity", "destinationCity")
      .select([
        "trip.id",
        "trip.availableSeats",
        "trip.pricePerSeat",
        "trip.departureDateTime",
        "departureCity.name",
        "destinationCity.name",
        "trip.distance",
        "trip.duration",
      ])
      .getMany();
  }

  async GetFilteredTrip(
    dCity: string,
    aCity: string,
    dateTrip: string
  ): Promise<any[]> {
    return await this.tripRepository
      .createQueryBuilder("trip")
      .innerJoinAndSelect("trip.departureCity", "departureCity")
      .innerJoinAndSelect("trip.destinationCity", "destinationCity")
      .select([
        "trip.id",
        "trip.availableSeats",
        "trip.pricePerSeat",
        "trip.departureDateTime",
        "departureCity.name",
        "destinationCity.name",
      ])
      .where("departureCity.name = :dCity", { dCity })
      .andWhere("destinationCity.name = :aCity", { aCity })
      .andWhere("DATE(trip.departureDateTime) = :dateTrip", { dateTrip })
      .getMany();
  }
}
