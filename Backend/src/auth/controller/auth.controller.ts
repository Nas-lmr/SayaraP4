import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUser.email,
      loginUser.password
    );
    console.log(user, "USER");

    return this.authService.login(user);
  }
}
