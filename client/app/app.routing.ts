import {Routes, RouterModule} from "@angular/router";
import {AdminLoginComponent} from "./admin/components/adminLogin.component";
import {AdminPageComponent} from "./admin/components/adminPage.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'adminLogin', component: AdminLoginComponent, data: {title: 'Admin Login'}},
    {path: 'adminPage', component: AdminPageComponent, data: {title: 'Admin Page'}},
    {path: 'about', component: AboutComponent, data: {title: 'About'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home Page'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
