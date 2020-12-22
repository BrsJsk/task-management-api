import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { User } from '../auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'taskmanuser',
  password: 'taskmanpassword',
  database: 'taskmandb',
  entities: [Task, User],
  synchronize: false,
};
