import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UiService {
  private showAddTask: boolean = false;
  private showAppointments: boolean = true;
  private idOfSelectedUser: number;
  private addSubject = new Subject<any>();
  private showAppointmentsSubject = new Subject<any>()
  private idValueSubject = new Subject<any>()

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.addSubject.next(this.showAddTask);
  }

  toggleShowAppointments(): void {
    this.showAppointments = !this.showAppointments;
    this.showAppointmentsSubject.next(this.showAppointments);
  }

  onToggleAddTask(): Observable<any> {
    return this.addSubject.asObservable();
  }

  onToggleShowAppointments(): Observable<any> {
    return this.showAppointmentsSubject.asObservable();
  }

  onChangeIdValue(): Observable<any> {
    return this.idValueSubject.asObservable();
  }

  setIdValue(idOfSelected: number) {
    this.idOfSelectedUser = idOfSelected;
    this.idValueSubject.next(this.idOfSelectedUser)
  }
}
