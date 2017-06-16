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
          this.returnUrl="";
    }

    doLogin() {
        this.loading = true;
        this.paymentAppService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    //this.router.navigate([this.returnUrl]);
                });
          }
}
