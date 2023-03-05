import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {User} from "../../User";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name: string;
  users: User[] = []

  constructor(private taskService: TaskService, private toastr: ToastrService) {
    this.name = history.state.name;
  }

  ngOnInit() {
    if (!this.name) {
      this.toastr.warning("No authorization for this route!", '', {
        positionClass: 'toast-top-center',
        timeOut: 7000
      })
    }
    else {
      this.taskService.getTasks().subscribe(users => this.users = users)
    }
  }
}
