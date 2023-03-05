import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PetType} from "../../PetType";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Output() userInfoClick: EventEmitter<number> = new EventEmitter();

  @Input() class: string;
  @Input() name: string;
  @Input() pet: PetType;
  @Input() userId: number;
  @Input() isAdmin: boolean = false;

  onClick() {
    this.userInfoClick.emit(this.userId);
  }

}
