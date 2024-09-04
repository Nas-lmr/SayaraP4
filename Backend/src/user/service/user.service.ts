import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(
    username: string,
    email: string,
    password: string,
    description: string
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.description = description;

    return this.userRepository.save(user);
  }

  getUsers(): Promise<UserEntity[] | undefined> {
    return this.userRepository.find();
  }

  

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
