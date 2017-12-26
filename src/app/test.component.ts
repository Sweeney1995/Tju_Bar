import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { MethodService} from "./method.service";
import {Po} from "./Class/Po";
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  re:number;
  constructor(private aroute: ActivatedRoute,
              public loca: Location, private rout:Router, private m:MethodService) {}
  name: string;
  flag: boolean;
  tieName:string;
  tieThing:string;
  userId: number;
  userName:string;
  tieji:Po[];
  bian:string;
  onSelect() {
    if(sessionStorage.getItem('userName') !== "游客") {
    if(this.flag === false){
      this.m.addTie(this.tieName,this.tieThing,+sessionStorage.getItem('id')).then(()=> alert("添加成功！"));
      this.tieName=null;
      this.tieThing=null;
    }
    this.flag=!this.flag;} else { alert("登录后才可以发帖~"); }
  }
  back() {
    this.flag=true;
  }
  goBack() {
    this.loca.back();
  }
  goDetail() {
    this.rout.navigate(['eve',"test"]);
  }
  goDetailbyId(poid:string) {
    this.m.goAddress('eve',poid);
  }
  goInde() {
    this.m.routeTo('inde');
  }
  bianValue() {
    if(sessionStorage.getItem('id')!=null) {
      this.bian="退出";
    } else {
      this.bian="登录";
    }
  }
  goInfog() {
    this.m.routeTo('perinfog');
  }
  goLogin() {
    this.m.routeTo('login');
  }
  goInfo() {
    if(this.userName !== "游客")
      this.m.routeTo('info');
  }
  ngOnInit(): void {
      this.userName=sessionStorage.getItem('userName');
      this.flag=true;
      this.bianValue();
      this.userId=parseInt(sessionStorage.getItem('id'));
      this.m.findAllPosting().then(data => { this.tieji = data['postthingList'];});
}
}
