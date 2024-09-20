import { Injectable, HttpStatus } from "@nestjs/common";
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

  // creating a new trip ***********************************************************
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
      const departureDateTime = dateTimeFormat(
        tripData.departureDate,
        tripData.departureTime
      );

      //  check if a trip already exists on the same day
      const existingTripQuery = `
      SELECT * FROM trip_entity
      WHERE owner_id = ? 
      AND departure_city_id = ? 
      AND DATE(departureDateTime) = DATE(?);
    `;

      const [existingTrips] = await this.tripRepository.query(
        existingTripQuery,
        [tripData.owner, tripData.departure_city_id, departureDateTime]
      );

      if (existingTrips) {
        

        return {
          status: HttpStatus.BAD_REQUEST,
          message:
            "You cannot create two trips departing from the same city on the same day.",
        };
      }
      if (!existingTrips) {
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
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      return {
        status: 500,
        message: "An error occurred while creating the trip.",
      };
    }
  }


  // get all trips***********************************************************************************
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

  // get trips by filtering **********************************************************************
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
        "trip.distance",
        "trip.duration",
      ])
      .where("departureCity.name = :dCity", { dCity })
      .andWhere("destinationCity.name = :aCity", { aCity })
      .andWhere("DATE(trip.departureDateTime) = :dateTrip", { dateTrip })
      .getMany();
  }
}


