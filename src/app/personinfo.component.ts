import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {MethodService} from "./method.service";

@Component({
    selector: "app-perinfo",
    template: `
      <table align="center"><img src="../assets/img/top.jpg" width="1026" height="121"  border="0" (click)="this.m.goInde()"></table>
        <div class="im">
          <img src="../assets/img/xiugai.png" class="mar" alt="" width="40%" height="30%" (click)="goInde()"><br>
        </div><div class="div">
        <h3 class="h33">{{ userName }}</h3><h3 class="h33"><font color="#014b88">修改信息</font></h3>
      <label>原密码</label><input type="password" placeholder="请输入原密码" [(ngModel)]="oldpw"  (keyup)="tranT()"><br><br>
      <div *ngIf="flag">
      <label>新密码</label><input type="password" [(ngModel)]="newpw" minlength="6"  placeholder="必填,最少6位"><br>
        <label>确认密码</label><input [(ngModel)]="cpw" type="password" (keyup)="tiShi()" (keyup.enter)="ok()" placeholder="确认密码">
        <label *ngIf="flag2" class="ti">{{ tishi }}</label><br>
        <!--<div><label>邮箱</label><input type="text" maxlength="30" [(ngModel)]="info['userEmail']" placeholder="选填"><br>-->
      <!--<label>年级专业</label><input type="text" maxlength="15" [(ngModel)]="info['nj']" placeholder="选填"><br>-->
      <!--<label>兴趣爱好</label><input type="text" maxlength="20" [(ngModel)]="info['favor']" (keyup)="ti()" placeholder="选填">-->
      <!--<label *ngIf="num" class="ti">{{ num }}</label><br><br>-->
      <button (click)="ok()">提交</button>
        <button (click)="back()">返回</button></div></div>
    `,
    styleUrls: ["./personinfo.component.css"]
  }
)
export class PersoninfoComponent implements OnInit {
  info: object;
  oldpw:string;
  newpw:string;
  cpw: string;
  userName:string;
  num: number;
  flag: boolean;
  flag2:boolean;
  tishi: string;
  id:number;
  re:any;
  ddd:any;
  constructor(private route: Router, private loca: Location, private acRoute: ActivatedRoute, private m: MethodService) {
  }
  tranT() {
    if(this.oldpw === sessionStorage.getItem('userPassword')){
      this.flag = true;
    } else { this.flag=false; }
  }
  ok() {
    if (this.newpw === this.cpw && this.newpw.length > 5) {
      this.m.updatePassword(this.id,this.newpw).then(data => this.re = data)
        .then(() => { if(this.re===1) {sessionStorage.setItem('userPassword',this.newpw);this.m.routeTo("inde");}})
        .catch(this.handleError);
    } else {
      if (this.newpw.length>5) {
        alert("两次密码要一致！");
      } else { alert("密码长度至少6位");}
    }
  }
  private handleError(error: any): Promise<any> {
    alert("未成功！");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  back() {
    this.loca.back();
  }
  ti() {
    this.num = 20 - this.info['favor'].length;
  }

  tiShi() {
    this.flag2 = true;
    if (this.newpw === this.cpw) {
      this.tishi = "一致";
    } else {
      this.tishi = '不一致';
    }
  }

  ngOnInit() {
    this.tishi = '不一致';
    this.num = 0;
    this.userName=sessionStorage.getItem('userName');
    this.id=parseInt(sessionStorage.getItem('id'),10);
    this.flag = false;
    this.flag2=false;
  }
}
