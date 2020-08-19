import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from '../task/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "taskmanuser",
    password: "taskmanpassword",
    database: "taskmandb",
    entities: [Task],
    synchronize: true
};
