import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowed = [TaskStatus.ACTIVE, TaskStatus.CLOSED, TaskStatus.OPEN];
    transform(value: any) {
        if (!this.isStatusValid(value)) {
            throw new BadRequestException("Status is not valid");
        }
        return value;
    }

    private isStatusValid(status: any): boolean {
        const idx = this.allowed.indexOf(status);
        return idx !== -1;
    }
}
