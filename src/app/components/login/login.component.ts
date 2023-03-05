import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../../User";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  users: User[] = []
  @Output() onLogin: EventEmitter<User> = new EventEmitter();

  router: Router;
  name: string;
  password: string;
  id: number;

  constructor(router: Router, private loginService: LoginService, private toastr: ToastrService) {
    this.router = router;
    this.loginService.getUsers().subscribe(
      (users) => this.users = users
    );
  }

  private nullAllValues() {
    this.name = undefined;
    this.password = undefined;
    this.id = undefined;
  }

  onSubmit() {
    if (this.password == "admin") {
      this.router.navigate(['/admin'], {state: {name: this.name}});
      this.nullAllValues();
    }
    else {
      if (this.users.filter(user => user.name === this.name)[0]) {
        this.id = this.users.filter(user => user.name === this.name)[0].id;
        this.loginService.getUser(this.id).subscribe( (user) => this.router.navigate(['/tasks'], {state: {user: user as User}}) );
      }
      else {
        this.toastr.info("No such user", '', {
          positionClass: 'toast-top-center',
          timeOut: 3000
        })
      }
      this.nullAllValues();
    }
  }

}
