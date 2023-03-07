import {Component, Input} from '@angular/core';
import { Appointment } from 'src/app/Appointment';
import {AppointmentService} from "../../services/appointment.service";
import {User} from "../../User";
import {PetType} from "../../PetType";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  @Input() userByDoctor: User;
  @Input() isAdmin: boolean = false;

  appointments: Appointment[] = [];
  user: User;
  name: string;
  pet: PetType;

  isExpanded: boolean;

  constructor(private appointmentService: AppointmentService, private uiService: UiService) {
  }

  ngOnInit(): void {
    if (this.userByDoctor) {
      this.user = this.userByDoctor;
    }
    else {
      this.user = history.state['user'];
    }
    this.appointmentService.getAppointmentsByUser(this.user.id).subscribe(data => {
      this.appointments = data['appointments']
    })
    this.name = this.user.name;
    this.pet = this.user.petType;
    this.isExpanded = !this.isAdmin;
  }


  toggleShowAppointments(userId: number) {
    this.uiService.setIdValue(userId);
    this.uiService.toggleShowAppointments();
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService
      .deleteAppointment(appointment)
      .subscribe(
      () => (this.appointments = this.appointments.filter(t => t.id !== appointment.id))
    );
  }

  toggleReminder(appointment: Appointment) {
    appointment.reminder = !appointment.reminder;
    this.appointmentService.updateAppointmentReminder(appointment).subscribe();
  }

  addAppointment(appointment: Appointment) {
    this.appointmentService.addTask(appointment, this.user.id).subscribe(
      (appointment) => this.appointments.push(appointment)
    );
  }

  addNote(appointment: Appointment) {
    this.appointmentService.addNote(appointment).subscribe(
        (appointment) => {
          const temp: Appointment[] = [];
          for (let a of this.appointments) {
            if (a.id != appointment.id) {
              temp.push(a)
            } else {
              temp.push(appointment)
            }
          }
          this.appointments = temp;
        }
    )
  }
}
