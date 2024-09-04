import { Body, Controller, Post,Get } from "@nestjs/common";
import { UserService } from "../service/user.service";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(
    @Body("username") username: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("description") description: string
  ) {
    return this.userService.create(username, email, password, description);
  }

  @Get()
  async getUsers(){
    return await this.userService.getUsers()
  }
}
