import { CityDto } from "src/city/dto/city.dto";
import { UserDto } from "src/user/dto/user.dto";

export class TripDto {
  id: number;
  owner: UserDto;
  departureCity: CityDto;
  destinationCity: CityDto;
  meetingPoint: string;
  availableSeats: number;
  departureTime: Date;
}
