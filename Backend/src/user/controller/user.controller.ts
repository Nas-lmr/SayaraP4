import { Body, Controller, Get, Param, Post, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() userdto: UserDto, @Body('password') password: string) {
    try {
      const user = await this.userService.create(userdto, password);
      return { status: 200, message: 'User created successfully', user };
    } catch (error) {
      throw new HttpException(
        `Error creating user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }



  // @Get()
  // async getUsers() {
  //   try {
  //     const users = await this.userService.getUsers();
  //     return users;
  //   } catch (error) {
  //     throw new HttpException(
  //       `Error fetching users: ${error.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }



  @Get(':id')
  async findUserById(@Param('id') userId: number) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }



  // Déconnexion de l'utilisateur
  @Post('logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
      return res.status(200).json({ status: 200, message: 'User logged out successfully' });
    } catch (error) {
      throw new HttpException(
        `Error logging out user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
