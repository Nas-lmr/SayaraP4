import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(userDto: UserDto, password: string): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const user = new UserEntity();
    Object.assign(user, userDto);
    user.password = hashedPassword;

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  getUsers(): Promise<UserEntity[] | undefined> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(userId: number): Promise<UserEntity | undefined> {
    const query = `
    SELECT id
    FROM user_entity
    WHERE id = ?
  `;

    const result = await this.userRepository.query(query, [userId]);
    return result;
  }
}
