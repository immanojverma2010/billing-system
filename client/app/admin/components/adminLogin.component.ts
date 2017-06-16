import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';

import {PaymentAppService} from "../../services/payment-app-service";

@Component({
    selector:"admin",
    templateUrl: './app/admin/components/adminLogin.html',
    providers: [PaymentAppService]
})

export class AdminLoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private paymentAppService: PaymentAppService,
    ) { }

    ngOnInit() {
          this.returnUrl="/adminPage";
    }

    doLogin() {
        this.loading = true;
        console.log(this.model.username +" :" +this.model.password);
        this.paymentAppService.login(this.model.username.trim(), this.model.password.trim())
            .subscribe(data => {
                        console.log(data);
                        console.log("logged in");
                    this.router.navigate([this.returnUrl]);
                });
          }
}
