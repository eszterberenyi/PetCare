import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../User";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(name: string): Observable<User> {
    const url = `${this.apiUrl}/?name=${name}`;
    return this.http.get<User>(url);
  }

}
