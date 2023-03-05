import {Injectable} from '@angular/core';
import {Appointment} from '../Appointment';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private usersApiUrl = 'http://localhost:5000/users';
  private tasksApiUrl = 'http://localhost:5000/appointments';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}/?_embed=appointments`);
  }

  getUsersByDoctor(doctorId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}/?doctorId=${doctorId}`);
  }

  getAppointmentsByUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersApiUrl}/${userId}?_embed=appointments`);
  }

  deleteAppointment(task: Appointment): Observable<Appointment> {
    const url = `${this.tasksApiUrl}/${task.id}`;
    return this.http.delete<Appointment>(url);
  }

  updateAppointmentReminder(task: Appointment): Observable<Appointment> {
    const url = `${this.tasksApiUrl}/${task.id}`;
    return this.http.put<Appointment>(url, task, httpOptions);
  }

  addTask(task: Appointment, userId: number): Observable<Appointment> {
    task.userId = userId;
    const url = `${this.tasksApiUrl}`
    return this.http.post<Appointment>(url, task, httpOptions);
  }
}
