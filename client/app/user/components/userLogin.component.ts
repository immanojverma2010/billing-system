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

  constructor(
    private router: Router,
    private _userService: UserService,
    ) { }

    ngOnInit() {
          this.returnUrl="/userPage";
    }

    doLogin() {
        this.loading = true;
        console.log(this.model.username +" :" +this.model.password);
        this._userService.login(this.model.username.trim(), this.model.password.trim())
            .subscribe(data => {
                        console.log(data);
                        console.log("logged in");
                    this.router.navigate([this.returnUrl, {email:this.model.username.trim()}]);
                });
          }
}
