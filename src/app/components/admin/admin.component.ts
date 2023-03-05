import { Component } from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {User} from "../../User";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  user: User
  users: User[] = []

  constructor(private taskService: AppointmentService, private toastr: ToastrService) {
    this.user = history.state.user;
  }

  ngOnInit() {
    if (!this.user) {
      this.toastr.warning("No authorization for this route!", '', {
        positionClass: 'toast-top-center',
        timeOut: 7000
      })
    }
    else {
      this.taskService.getUsersByDoctor(this.user.id).subscribe(users => this.users = users)
    }
  }
}
