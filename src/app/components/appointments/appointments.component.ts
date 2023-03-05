import {Component, Input} from '@angular/core';
import { Appointment } from 'src/app/Appointment';
import {AppointmentService} from "../../services/appointment.service";
import {User} from "../../User";
import {PetType} from "../../PetType";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  @Input() userByDoctor: User;
  appointments: Appointment[] = [];
  user: User;
  name: string;
  pet: PetType;

  constructor(private appointmentService: AppointmentService) {
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
      console.log(this.appointments)
    })
    this.name = this.user.name;
    this.pet = this.user.petType;
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
}
