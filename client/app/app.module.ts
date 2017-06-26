import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app.component";
import {AdminLoginComponent} from "./admin/components/adminLogin.component";
import {AdminPageComponent} from "./admin/components/adminPage.component";
import {UserLoginComponent} from "./user/components/userLogin.component";
import {UserPageComponent} from "./user/components/userPage.component";
import {BillFilterPipe} from "./user/components/billFilterPipe";
import {PaymentDoneComponent} from "./user/components/paymentDone.component";
import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";


import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AdminLoginComponent,
        AdminPageComponent,
        UserLoginComponent,
        UserPageComponent,
        AboutComponent,
        HomeComponent,
        PaymentDoneComponent,
        BillFilterPipe
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
