import {Component} from '@angular/core';
import {User} from "../../User";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {ToastrService} from "ngx-toastr";
import {Doctor} from "../../Doctor";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: User | Doctor

  router: Router;
  name: string;
  password: string;

  constructor(router: Router, private loginService: LoginService, private toastr: ToastrService) {
    this.router = router;
  }

  private nullAllValues() {
    this.name = null;
    this.password = null;
  }

  private validateUser(user: User | Doctor, route: string) {
    this.user = user[0]
    if (this.user) {
      this.router.navigate([route], {state: {user: this.user}})
    }
    else {
      this.toastr.info("No such user", '', {
        positionClass: 'toast-top-center',
        timeOut: 3000
      })
    }
  }

  onSubmit() {
    if (this.password == "admin") {
      this.loginService.getDoctor(this.name).subscribe({
        next: (user: Doctor) => {
          this.validateUser(user, '/admin')
          this.nullAllValues();
        }
      })
    }
    else {
      this.loginService.getUser(this.name).subscribe({
        next: (user: User) => {
          this.validateUser(user, '/appointments')
        },
      })
      this.nullAllValues();
    }
  }

}
