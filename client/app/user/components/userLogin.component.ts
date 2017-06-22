import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';

import {UserService} from "../../services/user-service";

@Component({
    selector:"user-login",
    templateUrl: './app/user/components/userLogin.html',
    providers: [UserService]
})

export class UserLoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  msg = null;

  constructor(
    private router: Router,
    private _userService: UserService,
    ) { }

    ngOnInit() {
          this.returnUrl="/userPage";
    }

    doLogin() {
      let self = this;
        this.loading = true;
        console.log(this.model.username +" :" +this.model.password);
        this._userService.login(this.model.username.trim(), this.model.password.trim())
            .subscribe(data => {
                        console.log(data);
                        this.msg = data.msg;
                        setTimeout(function(){self.msg = null;
                        },3000);
                        console.log("logged in");
                        if (data.msg === "") {
                            this.router.navigate([this.returnUrl, {email:this.model.username.trim()}]);
                        }

                });
          }
}
