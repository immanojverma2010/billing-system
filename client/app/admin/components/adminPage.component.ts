import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {UserService} from "../../services/user-service";
import {BillerService} from "../../services/biller-service";

@Component({
    selector:"admin-page",
    templateUrl: './app/admin/components/adminPage.html',
    providers: [UserService, BillerService]
})
export class AdminPageComponent implements OnInit {
userForm = true;
billerForm = false;
user: any = {};
biller: any = {};
msg = null;
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
cities = [];


selectedValue(name :any) { // right now: ['1','3']
//console.log(name);
//console.log(this.options);
let self = this;
 this.options.forEach(function( obj ) {
            //  console.log(obj);
        if (obj.name === name) {
        //  console.log(obj);
          self.options[obj.index].checked = !self.options[obj.index].checked;
        }
});
//console.log(this.options);
  }

    constructor(private _userService :UserService,
                private _billerService :BillerService) {

    }
    ngOnInit() {

    }
    getCityValues() {
      let self = this;
      this.options.forEach(function( obj ) {
              if(obj.checked) {
                self.cities.push(obj.name);
              }
      });
      //console.log(this.cities);
    }
    addBiller() {
        console.log(this.biller);
       let  self = this ;
            this.getCityValues();
            this.biller.cities = this.cities;
            this.cities = [];
            this.msg = null;
            this._billerService.addBiller(this.biller)
                .subscribe(data => {
                  console.log(data);
                  this.msg = data.msg;
                  setTimeout(function(){self.msg = null;
                  },2000);
                  console.log(this.msg);
                  this.biller = {};
                });

    }

    addUser() {
      console.log(this.user);
      let  self = this ;
      this._userService.addUser(this.user)
          .subscribe(data => {
                      console.log(data);
                      this.msg = data.msg;
                      setTimeout(function(){self.msg = null;
                      },2000);
                      console.log(this.msg);
                      this.user = {};
                  //this.router.navigate([this.returnUrl]);
              });
        }


    userPage(value :any) :void {
        this.userForm = true;
        this.billerForm = false;
    }

    billerPage(value :any) :void {
      this.billerForm = true;
      this.userForm = false;
    }
}
