import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/service/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService:UserService,
    private readonly jwtService:JwtService,
  ){}


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

async login(user:any){

  const payload={email: user.email, sub:user.userId};
  return{
    access_token:this.jwtService.sign(payload),
  }
}

}
