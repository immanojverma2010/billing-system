import {Routes, RouterModule} from "@angular/router";
import {AdminLoginComponent} from "./admin/components/adminLogin.component";
import {AdminPageComponent} from "./admin/components/adminPage.component";

import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
    {path: '', redirectTo: 'about', pathMatch: 'full'},
    {path: 'adminLogin', component: AdminLoginComponent, data: {title: 'Admin Login'}},adminPage
    {path: 'adminPage', component: AdminPageComponent, data: {title: 'Admin Page'}},
    {path: 'about', component: AboutComponent, data: {title: 'About'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
