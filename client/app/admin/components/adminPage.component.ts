import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
    selector:"about",
    templateUrl: './app/admin/components/adminPage.html'
})
export class AdminPageComponent implements OnInit {
userForm = true;
billerForm = false;
    ngOnInit() {

    }

    addUser(value :any) :void {
        this.userForm = true;
        this.billerForm = false;
    }

    addBiller(value :any) :void {
      this.billerForm = true;
      this.userForm = false;
    }
}
