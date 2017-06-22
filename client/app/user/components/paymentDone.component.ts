import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector:"about",
    templateUrl: './app/user/components/paymentDone.html'
})
export class PaymentDoneComponent implements OnInit {
  username = null;
  msg = null;

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.username = params['email'];
        this.msg = params['msg'];
      });
    }

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    back() {
      this.router.navigate(["/userPage", {email:this.username}]);
      }
}
