import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {BillerService} from "../../services/biller-service";
import {UserService} from "../../services/user-service";



@Component({
    selector:"user-page",
    templateUrl: './app/user/components/userPage.html',
    providers: [BillerService, UserService]
})
export class UserPageComponent implements OnInit {
  regBillerPage = false;
  bills = false;
  city = null;
  msg = null;
  username = null;
  user = {};
  billerValue = null;
  showAccount = false;
  billers :any = null;
  options = [
        {name:'Delhi', index:'0', checked:false},
        {name:'Kolkata', index:'1', checked:false},
        {name:'Bangalore', index:'2', checked:false},
        {name:'Chennai', index:'3', checked:false},
        {name:'Mumbai', index:'4', checked:false},
        {name:'Pune', index:'5', checked:false},
        {name:'Hyderabad', index:'6', checked:false},
        {name:'Chandigarh', index:'7', checked:false}
      ];

    constructor(private _billerService: BillerService,
                private route: ActivatedRoute,
                private router: Router,
                private _userService: UserService) { }

    ngOnInit() {
          this.route.params.subscribe(params => {
            this.username = params['email'];
          });
          this._userService.findDetails(this.username)
              .subscribe(data => {
                      this.user = data;
              });
    }

    onInputCity(value :any) {
      this.city = value;
      this.findBiller();
    }

    findBiller() {
      let self = this;
      this._billerService.findBiller(this.city)
          .subscribe(data => {
                        if(data.msg) {
                            this.msg = data.msg;
                            setTimeout(function(){self.msg = null;
                            },3000);
                            this.city = null;
                        } else {
                            this.billers = data ;
                            console.log(this.billers);
                            this.city = null;
                        }
              });

    }

    onInputBiller(value :any) {
          this.billerValue = value;
    }

    back() {
    this.router.navigate(['/userPage', {email:this.username.trim()}]);
    }

    proceed() {
          console.log("Heloo");        
    }

    subscribeBiller() {
        this.bills = false;
        this.regBillerPage = true;
    }

    showBills() {
      this.regBillerPage = false;
      this.bills = true;
    }
}
