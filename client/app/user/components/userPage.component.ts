import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {BillFilterPipe} from "./billFilterPipe";

import {BillerService} from "../../services/biller-service";
import {UserService} from "../../services/user-service";
import {BillingService} from "../../services/billing-service";



@Component({
    selector:"user-page",
    templateUrl: './app/user/components/userPage.html',
    providers: [BillerService, UserService, BillingService],
    pipes: [BillFilterPipe]
})
export class UserPageComponent implements OnInit {
  userBills :any = null;
  billMsg = null;
  regBillerPage = false;
  payments = false;
  pendingBills = false;
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
                            },2000);
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
          setTimeout(function (){self.modeOfPayment = true;},750);
    }

getCurrentDate() :string {
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd;
}
if(mm<10) {
    mm = '0'+mm;
}
return (yyyy +'-' +mm +'-' +dd );

}


billerTxn() {
let self =this;
let obj = this.billers.find(function(biller) {
    return biller.email === self.billerValue;
  });

var todayDate = this.getCurrentDate();

  var billData = {
userId : this.user.username,
userAccount: this.user.account,
userName: this.user.fullname,
billerId: obj.email,
billerAccount: obj.account,
billerName: obj.billername,
utilityName: obj.utilityname,
paymentFor: this.formData.mobile,
paymentMode: this.formData.paymentMode,
billDate: this.formData.billDate,
dueDate: this.formData.dueDate,
txnDate: todayDate
  };

  this._billingService.storeBillingData(billData)
      .subscribe(data => {
              console.log(data);

              this.clearData();
              this.router.navigate(["/paymentDone", {email: billData.userId, msg: data.msg}]);

      });

}

  clearData() {
  this.regBillerPage = false;
  this.payments = false;
  this.city = null;
  this.msg = null;
  this.username = null;
  this.user = {};
  this.billerValue = null;
  this.showAccount = false;
  this.billers = null;
  this.showVendorForm =false;
  this.modeOfPayment = false;
  this.formData = {};

  }

    proceed() {
        this.showVendorForm = true;
    }

    subscribeBiller() {
        this.payments = false;
        this.pendingBills = false;
        this.regBillerPage = true;
    }

    showPendingBills() {
      this.payments = false;
      this.regBillerPage = false;
      this.pendingBills = true;
      this.showOrders("pendingBills");
    }

    showOrders(value : any) {

      this._billingService.findbills(this.username)
          .subscribe(data => {
            if (value === "pendingBills" ) {
              this.regBillerPage = false;
              this.pendingBills = true;
              this.payments = false;
            } else {
              this.regBillerPage = false;
              this.pendingBills = false;
              this.payments = true;
            }

                    if (data.msg) {
                        this.billMsg = data.msg;
                        this.userBills = {};
                    } else {
                      this.userBills = data;
                      this.checkPaymentStatus();
                      //console.log(this.userBills);
                    }
          });


    }

    checkPaymentStatus() {
      var d = new Date();
      this.userBills.forEach(function(bill) {
        var lastPayment = bill.txnDate;
        if (bill.paymentMode === "Confirm Pay"
            //&& d.getDate() > parseInt(bill.dueDate.substring(8,10),10)

            && (d.getMonth() + 1) > ( parseInt(bill.txnDate.substring(5,7),10)) ) {
              console.log((d.getMonth() + 1));
              console.log(bill.txnDate.substring(3,2));
            bill.paymentStatus = true;
            console.log("if condition checked");
        } else {
          bill.paymentStatus = false;
        }
      });
    }
     payNow(value :any) {
       var todayDate = this.getCurrentDate();
       value.txnDate = todayDate;
       this._billingService.pay(value)
           .subscribe(data => {
             console.log(data);
           });
     }

}
