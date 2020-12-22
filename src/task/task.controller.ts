import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findTasks(@Query() filterDto: GetTasksFilterDto) {
    return this.taskService.findAll(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    console.log(user);
    return this.taskService.create(createTaskDto, user);
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) body: TaskStatus,
  ) {
    return this.taskService.updateStatus(id, body);
  }
}
