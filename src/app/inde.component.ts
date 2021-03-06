import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {MethodService} from "./method.service";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import { Hero} from "./Class/Hero";
import { Po } from "./Class/Po";
import {Location} from "@angular/common";
import {Dis} from "./Class/Dis";

@Component({
  selector: 'app-ind',
  templateUrl: './inde.component.html',
  styleUrls: ['./inde.component.css']
})
export class IndeComponent implements OnInit {
  name: string;
  rec = '';
  infom: Hero=new Hero;
  bian: string;
  id:any;
  tieji:Po[];
  dis:Dis;
  inputValue:string;
  flag: boolean;
  constructor( private loac:Location, private M: MethodService, private acRoute:ActivatedRoute) {}
  onkey(value: string) {
    this.rec = value;
  }
  goStudy() {
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
  goInfo() {
    if(this.infom['userName'] !== "游客")
      this.M.routeTo('info');
  }
  goInfog() {
    this.M.routeTo('perinfog');
  }
  goLogin() {
    this.M.routeTo('login');
  }
  goDetailbyId(poid:string) {
    this.M.goAddress('eve',poid);
  }
  delePost(poid:string) {
    this.M.deletePosting(poid);
  }
  getPosts() {
    if( this.id != null) { this.M.byDate(this.id).then(data => { this.tieji = data['postthingList'].slice(0,5);});
    } else { this.M.byDate('17').then(data => { this.tieji = data['postthingList'].slice(0,5);});}
  }
  findPosts() {
    if(this.inputValue !== null) {
    this.M.findByKey(this.inputValue,17).then(data => { this.tieji = data['postthingList'];
    if(this.tieji.length === 0) {alert("不好意思，没找没有相关帖子 =。=");this.flag=true;
    this.M.byDate('17').then(datas => { this.tieji = datas['postthingList'].slice(0,5);});} else { this.flag=false;}
    });
    } else { alert("请输入搜索关键字！");}
  }
  ngOnInit() {
    this.bian="登录";
    this.flag=true;
    this.infom.userName="游客";
    this.id=sessionStorage.getItem('id');
    this.infom.userName=sessionStorage.getItem('userName');
    this.bianValue();
    this.getPosts();
  }
}
