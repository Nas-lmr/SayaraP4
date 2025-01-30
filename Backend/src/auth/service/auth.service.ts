// import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import * as bcrypt from "bcrypt";
// import { UserService } from "src/user/service/user.service";

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UserService,
//     private readonly jwtService: JwtService
//   ) {}

//   async validateUser(email: string, pass: string): Promise<any> {
//     const user = await this.usersService.findByEmail(email);
//     if (user && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { id: user.id, email: user.email, username: user.username };
//     return {
//       token: this.jwtService.sign(payload,{ expiresIn: '1h' }),
//     };
//   }
// }

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, res: Response) {
    try {
      if (!user) {
        return res.status(400).json({ message: "Invalid user data provided" });
      }

      // Generate token with payload
      const payload = {
        id: user.id,
        username: user.username,
      };
      let token: string;

      try {
        token = this.jwtService.sign(payload, {
          expiresIn: "1d",
          secret: process.env.JWT_SECRET,
        });
      } catch (err) {
        console.error("Token generation failed:", err);
        return res
          .status(500)
          .json({ message: "Internal server error: Token generation failed" });
      }

      // Set the token in cookies
      try {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        });
      } catch (err) {
        console.error("Failed to set cookie:", err);
        return res
          .status(500)
          .json({ message: "Internal server error: Failed to set cookie" });
      }

      return res.status(200).json({
        message: "Connexion réussie",
      });
    } catch (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ message: "An unexpected error occurred during login" });
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersService.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const { id, username } = user;
      const userData = { id, username };
      return userData;
    } catch (err) {
      console.error("Token validation error:", err.message);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
