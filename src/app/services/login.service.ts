import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../User";
import {Doctor} from "../Doctor";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private userApiUrl = 'http://localhost:5000/users';
  private doctorApiUrl = 'http://localhost:5000/doctors';

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }

  getDoctor(name: string): Observable<Doctor> {
    const url = `${this.doctorApiUrl}/?name=${name}`;
    return this.http.get<Doctor>(url);
  }

  getUser(name: string): Observable<User> {
    const url = `${this.userApiUrl}/?name=${name}`;
    return this.http.get<User>(url);
  }

}
