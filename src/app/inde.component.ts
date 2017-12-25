import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {MethodService} from "./method.service";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import { Hero} from "./hero";
import {Location} from "@angular/common";

@Component({
  selector: 'app-ind',
  templateUrl: './inde.component.html',
  styleUrls: ['./inde.component.css']
})
export class IndeComponent implements OnInit {
  name: string;
  rec = '';
  getf: object[];
  infom: Hero=new Hero;
  pw: string;
  bian: string;
  id:any;
  tieji:object[];
  constructor( private loac:Location, private M: MethodService, private acRoute:ActivatedRoute) {}
  onkey(value: string) {
    this.rec = value;
  }
  goInfo() {
    if(this.infom['userName']!="游客")
    this.M.routeTo('info');
  }
  goToTest() {
    this.M.routeServe.navigate(['/study', 1]);
  }
  goBack() {
    this.loac.back();
  }
  bianValue() {
    if(sessionStorage.getItem('id')!=null) {
      this.bian="退出";
    } else {
      this.bian="登录";
    }
  }
  goInfog() {
    this.M.routeServe.navigate(['perinfog',this.infom.userName]);
  }
  goLogin() {
    this.M.routeServe.navigate(['login']);
  }
  ngOnInit() {
    this.bian="登录";
    this.infom.userName="游客";
    this.id=sessionStorage.getItem('id');
    this.infom.userName=sessionStorage.getItem('userName');
    this.bianValue();
  }
}
