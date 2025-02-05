
import { Body, Controller, Post, Res, HttpException, HttpStatus, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Res() res: Response) {
    
    const user = await this.authService.validateUser(loginUser.email, loginUser.password);
    
    if (!user) {
      throw new HttpException('Email ou mot de passe incorrect', HttpStatus.BAD_REQUEST);
    }
    
    return this.authService.login(user, res);
  }



  @Get("persist")
  async persistLogin(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.token;
    if (!token) {
      throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED);
    }

    try {
      const user = await this.authService.validateToken(token);
      return res.status(HttpStatus.OK).json({ success: true, user });
    } catch (err) {
      console.error("Error in persisting login:", err.message);
      throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);
    }
  }

  
}
