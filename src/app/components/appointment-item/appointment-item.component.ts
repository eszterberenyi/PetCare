import {Component, Input, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Appointment } from 'src/app/Appointment';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent {
  @Input() appointment: Appointment;
  @Output() onDeleteAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Appointment> = new EventEmitter();
  faTimes = faTimes;

  onDelete(task) {
    this.onDeleteAppointment.emit(task);
  }

  onToggle(task) {
    this.onToggleReminder.emit(task);
  }
}
