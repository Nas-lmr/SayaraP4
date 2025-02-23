import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class OwnerIdDTO {
  @IsNotEmpty()
  ownerID: number;
}
