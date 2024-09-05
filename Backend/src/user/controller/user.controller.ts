import { Body, Controller, Post, Get } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user.dto";
@Controller("register")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() userdto: UserDto, @Body("password") password: string) {
    return this.userService.create(userdto, password);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
