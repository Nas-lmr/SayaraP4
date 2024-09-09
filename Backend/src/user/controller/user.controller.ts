import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
@Controller("register")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userdto: UserDto, @Body("password") password: string) {
    await this.userService.create(userdto, password);
    return { status: 200, message: "User created" };
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
