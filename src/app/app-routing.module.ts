import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TestComponent} from "./test.component";
import {IndeComponent} from "./inde.component";
import {LoginComponent} from "./login.component";
import {Login2Component} from "./login2.component";
import {PersoninfoComponent} from "./personinfo.component";
import {InfoComponent} from "./info.component";
import {EvedetailComponent} from "./evedetail.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'study/:id', component: TestComponent },
  { path: 'inde', component: IndeComponent },
  { path: 'login', component: LoginComponent },
  { path:'register',component: Login2Component},
  { path: 'perinfog',component: PersoninfoComponent},
  {path:'info', component: InfoComponent },
  {path:'eve/:id', component: EvedetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
