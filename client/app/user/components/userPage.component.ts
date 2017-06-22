import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {BillerService} from "../../services/biller-service";
import {UserService} from "../../services/user-service";
import {BillingService} from "../../services/billing-service";



@Component({
    selector:"user-page",
    templateUrl: './app/user/components/userPage.html',
    providers: [BillerService, UserService, BillingService]
})
export class UserPageComponent implements OnInit {
  regBillerPage = false;
  bills = false;
  city = null;
  msg = null;
  username = null;
  user = {};
  billerValue :string = null;
  showAccount = false;
  billers :any = null;
  showVendorForm =false;
  modeOfPayment = false;
  formData = {};
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
                private _userService: UserService,
                private _billingService: BillingService
                 ) { }

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
          let self = this;
          this.billerValue = value;
          console.log(this.billerValue);
          setTimeout(function (){self.modeOfPayment = true;},0);
    }

billerTxn() {
let self =this;
//  console.log(this.formData);
//  console.log(this.user);
  //console.log(this.billers);
//  console.log(this.billerValue);
//let str :string = this.billerValue;
//console.log("String" +str);

let obj = this.billers.find(function(biller) {
    return biller.email === self.billerValue;
  });

//console.log(obj);
  var billData = {
userId : this.user.username,
userAccount: this.user.account,
userName: this.user.fullname,
billerId: obj.email,
billerAccount: obj.account,
billerName: obj.utilityname,
paymentFor: this.formData.mobile,
paymentMode: this.formData.paymentMode,
billDate: this.formData.billDate,
dueDate: this.formData.dueDate
  };

console.log(billData);

  this._billingService.storeBillingData(billData)
      .subscribe(data => {

              console.log(data);
              this.formData = {};
              this.user = {};
              this.billerValue = null ;
              this.showVendorForm = false;
              this.router.navigate(["/paymentDone"]);
      });

}

    proceed() {
        this.showVendorForm = true;
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
