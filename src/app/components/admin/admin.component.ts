import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {User} from "../../User";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name: string;
  users: User[] = []

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(users => this.users = users)
    this.name = history.state.name;
  }
}
