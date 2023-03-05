import {Component, Input, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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
  @Input() isAdmin: boolean;

  @Output() onDeleteAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Appointment> = new EventEmitter();
  @Output() onAddNote: EventEmitter<Appointment> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit;
  showAppointments: boolean;
  showAddNote: boolean;
  idOfSelectedUser: number;

  subscriptionToShowAppointment: Subscription;
  subscriptionToShowAddNote: Subscription;
  subscriptionToIdValue: Subscription;

  constructor(private uiService: UiService) {
    this.subscriptionToShowAppointment = this.uiService
        .onToggleShowAppointments()
        .subscribe(value => this.showAppointments = value);
    this.subscriptionToIdValue = this.uiService
        .onChangeIdValue()
        .subscribe(value => this.idOfSelectedUser = value);
    this.subscriptionToShowAddNote = this.uiService
        .onToggleAddNote()
        .subscribe(value => this.showAddNote = value)
  }

  toggleShowAddNote() {
    this.uiService.setIdValueOfAppointment(this.appointment.id);
    this.uiService.toggleAddNote();
  }

  onAddNoteTo(newNote) {
    this.onAddNote.emit(newNote);
  }

  onDelete(task: Appointment) {
    this.onDeleteAppointment.emit(task);
  }

  onToggle(task: Appointment) {
    this.onToggleReminder.emit(task);
  }
}
