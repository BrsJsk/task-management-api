import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { password, username } = authCredentials;

    const salt = await bcrypt.genSalt();
    const pw = await UserRepository.hashPassword(password, salt);

    const user = new User();
    user.username = username;
    user.password = pw;
    user.salt = salt;

    try {
      await user.save();
    } catch (err) {
      return err;
    }
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(authCredentials: AuthCredentialsDto): Promise<string> {
    const { password, username } = authCredentials;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return 'valid';
    }

    throw new UnauthorizedException();
  }
}
