import {Component, EventEmitter, Output} from '@angular/core';
import { Appointment } from 'src/app/Appointment';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  @Output() onAddAppointment: EventEmitter<Appointment> = new EventEmitter();

  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private toastr: ToastrService) {
    this.subscription = this.uiService
      .onToggleAddTask()
      .subscribe(value => this.showAddTask = value);
  }

  onSubmit() {
    if (!this.text) {
      this.toastr.info("No task to add", '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      })
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    this.onAddAppointment.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
