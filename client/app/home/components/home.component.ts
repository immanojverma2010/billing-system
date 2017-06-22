import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {AdminService} from "../../services/admin-service";

@Component({
    selector:"home",
    templateUrl: './app/home/components/home.html',
    providers: [AdminService]
})
export class HomeComponent implements OnInit {

  constructor(private _adminService: AdminService) {

    let admin = {
      fullname : "Manoj Verma",
      username : "admin@gmail.com",
      password : "abc",
      age : "22",
      contact : "1234567890"
    };
    this._adminService.addDefaultAdmin(admin)
        .subscribe(data => {
              console.log(data);

            });

   }



    ngOnInit() {

    }
}
