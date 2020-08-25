import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { password, username } = authCredentials;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (err) {
      return err;
    }
  }
}
