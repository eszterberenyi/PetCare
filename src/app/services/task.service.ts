import {Injectable} from '@angular/core';
import {Task} from '../Task';
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

export class TaskService {
  private usersApiUrl = 'http://localhost:5000/users';
  private tasksApiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}/?_embed=tasks`);
  }

  getUsersByDoctor(doctorId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}/?doctorId=${doctorId}`);
  }

  getTasksByUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersApiUrl}/${userId}?_embed=tasks`);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.tasksApiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.tasksApiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task, userId: number): Observable<Task> {
    task.userId = userId;
    const url = `${this.tasksApiUrl}`
    return this.http.post<Task>(url, task, httpOptions);
  }
}
