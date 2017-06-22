import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector:"about",
    templateUrl: './app/user/components/paymentDone.html'
})
export class PaymentDoneComponent implements OnInit {

    ngOnInit() {

    }

    back() {
      this.router.navigate(["/paymentDone"]);
    }
}
