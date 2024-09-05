import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  id: number;
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  description: string;
}
