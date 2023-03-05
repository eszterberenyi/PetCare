import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from "../../Appointment";
import {UiService} from "../../services/ui.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  @Output() onAddNote: EventEmitter<Appointment> = new EventEmitter();

  @Input() isAdmin;
  @Input() appointment: Appointment;

  text: string;
  showAddNote: boolean;
  idOfEdited: number;

  subscriptionToToggleShowNote: Subscription;
  subscriptionToIdOfEdited: Subscription;

  constructor(private uiService: UiService, private toastr: ToastrService) {
    this.subscriptionToToggleShowNote = this.uiService
        .onToggleAddNote()
        .subscribe(value => this.showAddNote = value);
    this.subscriptionToIdOfEdited = this.uiService
        .onChangeIdValueOfAppointment()
        .subscribe(value => this.idOfEdited = value)
  }

  onSubmit() {
    if (!this.text) {
      this.toastr.info("No note to add", '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      })
      return;
    }
    this.appointment.note = this.text;
    this.onAddNote.emit(this.appointment);
    this.text = '';
  }

}
