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
  user: User
  @Output() onLogin: EventEmitter<User> = new EventEmitter();

  router: Router;
  name: string;
  password: string;

  constructor(router: Router, private loginService: LoginService, private toastr: ToastrService) {
    this.router = router;
  }

  private nullAllValues() {
    this.name = undefined;
    this.password = undefined;
  }

  onSubmit() {
    if (this.password == "admin") {
      this.router.navigate(['/admin'], {state: {name: this.name}});
      this.nullAllValues();
    }
    else {
      this.loginService.getUser(this.name).subscribe({
        next: (user) => {
          this.user = user[0]
          if (this.user) {
            this.router.navigate(['/tasks'], {state: {user: this.user as User}})
          }
          else {
            this.toastr.info("No such user", '', {
              positionClass: 'toast-top-center',
              timeOut: 3000
            })
          }
        },
      })
      this.nullAllValues();
    }
  }

}
