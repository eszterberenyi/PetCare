import {Component, Input} from '@angular/core';
import {PetType} from "../../PetType";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() name: string;
  @Input() pet: PetType;

}
