import {Component, Input} from '@angular/core';
import { Task } from 'src/app/Task';
import {TaskService} from "../../services/task.service";
import {User} from "../../User";
import {PetType} from "../../PetType";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() adminUser: User;
  tasks: Task[] = [];
  user: User;
  name: string;
  pet: PetType;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    if (this.adminUser) {
      this.user = this.adminUser;
    }
    else {
      this.user = history.state['user'];
    }
    this.taskService.getTasksByUser(this.user.id).subscribe(data => this.tasks = data['tasks']);
    this.name = this.user.name;
    this.pet = this.user.petType;
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
      () => (this.tasks = this.tasks.filter(t => t.id !== task.id))
    );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task, this.user.id).subscribe(
      (task) => this.tasks.push(task)
    );
  }
}
