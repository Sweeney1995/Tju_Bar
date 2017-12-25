import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import {TestComponent} from './test.component';
import { AppRoutingModule} from './app-routing.module';
import { IndeComponent } from "./inde.component";
import { LoginComponent } from "./login.component";
import {MethodService} from "./method.service";
import {Login2Component} from "./login2.component";
import {PersoninfoComponent} from "./personinfo.component";
import {InfoComponent} from "./info.component";
import {EvedetailComponent} from "./evedetail.component";
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    IndeComponent,
    LoginComponent,
    Login2Component,
    PersoninfoComponent,
    InfoComponent,
    EvedetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService, MethodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
