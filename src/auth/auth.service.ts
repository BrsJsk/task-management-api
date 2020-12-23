import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    const valid = await this.userRepository.validatePassword(authCredentials);

    if (valid) {
      const { username } = authCredentials;
      const payload = { username };

      return this.jwtService.sign(payload);
    }

    throw new UnauthorizedException();
  }
}
