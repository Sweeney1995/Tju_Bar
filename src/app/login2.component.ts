import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import {MethodService} from "./method.service";

@Component({
  selector:"app-log2",
  template:`
    <div class="pos">
    <h2>注册用户</h2>
    <label>用户名</label><input [(ngModel)]="info['userName']" placeholder="必填"><br>
    <label>密码</label><input #pword type="password" minlength="6" (keyup)="getPassword(pword.value)" placeholder="必填,最少6位"><br>
    <label>确认密码</label><input [(ngModel)]="cpw" type="password" (keyup)="tiShi()" placeholder="确认密码"><br>
      <button (click)="ok()">ok</button><button (click)="back()">back</button></div>
  `,
  styleUrls: ["./login2.component.css"]
})

export class Login2Component implements OnInit {
  info: object;
  cpw: string;
  num: number;
  tishi: string;
  flag: boolean;
  re: any;
  rrr:any;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private route: Router, private loca:Location, private http:HttpClient,private m:MethodService) {}
  getPassword(pw:string ) {
    this.flag=false;
    this.info['userPassword'] =pw;
  }
  ok() {
    if(this.info['userName'] === null) {
      alert("请输入用户名");
    } else {
      if(this.info['userPassword'] ==null) {
        alert("请输入密码");
      } else {
        if(this.info['userPassword'].length<6) {
          alert("密码太短");
        }
        if (this.info['userPassword'] !== this.cpw) alert("密码输入不一致！");
      }
    }
    if(this.info['userPassword'] === this.cpw && this.info['userName']!=null && this.info['userPassword'].length > 5) {
      // this.http.post("/post_bar/user/saveUser",this.info).subscribe(data => {this.re = data});
      sessionStorage.setItem('userName',this.info['userName']);
      sessionStorage.setItem('userPassword',this.cpw);
      this.m.saveUser(this.info['userName'],this.info['userPassword'])
        .then(data => { if(data===1) {alert("注册成功"); this.route.navigate(["/inde"]);}})
        .catch(this.handleError);
    }
  }
  private handleError(error: any): Promise<any> {
    alert("用户已被注册");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  back() {
    this.loca.back();
  }
  ti() {
    this.num=20 - this.info['favor'].length;
  }
  tiShi() {
    this.flag=true;
    if(this.info['userPassword']===this.cpw){
      this.tishi="一致";
    }
    else{
      this.tishi='不一致';
    }
  }
  ngOnInit() {
    this.re='ooo';
    this.tishi='不一致';
    this.num = 0;
    this.flag=false;
    this.info = {userName: null ,userPassword: null};
  }
}
