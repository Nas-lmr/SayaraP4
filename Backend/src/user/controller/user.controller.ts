import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("register")
  async create(@Body() userdto: UserDto, @Body("password") password: string) {
    await this.userService.create(userdto, password);
    return { status: 200, message: "User created" };
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(":id")
  async findUserById(@Param("id") userId: number) {
    return await this.userService.findById(userId);
  }
}
