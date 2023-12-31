import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from '../../utils/hash-utils';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignInUserResponseDto } from './dto/sign-in-user-response.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignUpUserResponseDto } from './dto/sign-up-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpUserDto): Promise<SignUpUserResponseDto> {
    const user = await this.usersService.create(signUpDto);
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      username: user.username,
      email: user.email,
      about: user.about,
      avatar: user.avatar,
    };
  }

  provideJwtTokens(user: User): SignInUserResponseDto {
    const payload: IJwtPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }

  async validateUser(signInDto: SignInUserDto) {
    const user = await this.usersService.findOne({
      where: { username: signInDto.username },
    });
    if (user && (await compare(signInDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserById(id: number) {
    return (await this.usersService.findOne({ where: { id } })) || null;
  }
}
