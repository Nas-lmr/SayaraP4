import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
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

  @Post("logout")
  async logout(@Res() res: Response) {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });

    return res
      .status(200)
      .json({ status: 200, message: "User logged out successfully" });
  }
}
