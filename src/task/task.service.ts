import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  findAll(taskFilter: GetTasksFilterDto) {
    return this.taskRepository.getTasks(taskFilter);
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async findById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  delete(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
