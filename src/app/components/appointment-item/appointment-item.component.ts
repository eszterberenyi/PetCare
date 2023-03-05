import {Component, Input, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Appointment } from 'src/app/Appointment';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent {
  @Input() appointment: Appointment;
  @Input() userId: number;

  @Output() onDeleteAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Appointment> = new EventEmitter();
  faTimes = faTimes;
  showAppointments: boolean;
  idOfSelectedUser: number;
  subscriptionToShowAppointment: Subscription;
  subscriptionToIdValue: Subscription;

  constructor(private uiService: UiService) {
    this.subscriptionToShowAppointment = this.uiService
        .onToggleShowAppointments()
        .subscribe(value => this.showAppointments = value);
    this.subscriptionToIdValue = this.uiService
        .onChangeIdValue()
        .subscribe(value => this.idOfSelectedUser = value)
  }

  onDelete(task) {
    this.onDeleteAppointment.emit(task);
  }

  onToggle(task) {
    this.onToggleReminder.emit(task);
  }
}
