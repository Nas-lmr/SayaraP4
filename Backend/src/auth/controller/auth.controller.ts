import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginUserDto } from "../dto/auth.dto";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUser.email,
      loginUser.password
    );

    return this.authService.login(user);
  }
}
