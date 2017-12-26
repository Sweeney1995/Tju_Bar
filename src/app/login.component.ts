import {Component, OnInit} from '@angular/core';
import {MethodService} from "./method.service";
import 'rxjs/add/operator/toPromise';
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import {isNullOrUndefined} from "util";

@Component({
  template: `
    <div class="im"><img src="../assets/image/tju.jpeg" alt="" width="40%" height="30%"/><br></div>
    <div class="div">
      <h2>用户登录</h2><br>
      <label>用户名</label><input #userName (blur)="getName(userName.value)"><br>
      <label>密码</label><input #password type="password"  (blur)="getPassword(password.value)" ><br>
      <br><button (click)="logI()" >登录</button>
      <button (click)="goInde()" >游客访问</button>
      <button (click)="logIn2()" >注册</button>
    </div>`,
  selector: 'app-login',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  name:string;
  password:string;
  idd: string;
  re: object;
  public ppassword: string;
  constructor(private m: MethodService) {}
  goInde() {
    //this.m.routeServe.navigate(["/inde",sessionStorage.getItem('userName')]);
    this.m.routeTo('/inde');
  }
  getName(name:string ) {
   this.name=name;
  }
  getPassword(password: string) {
    this.password=password;
  }
  logI() {
    this.m.login(this.name,this.password).then(data => { this.re = data;})
      .then(() => {if(this.re['id'] !=null) {sessionStorage.setItem('id',this.re['id']);
      sessionStorage.setItem('userName',this.re['userName']);sessionStorage.setItem('userPassword',this.re['userPassword']);
      this.m.routeTo('inde');}})
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    alert("用户名或密码不对");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  logIn2() {
    this.m.routeServe.navigate(["register"]);
  }
  ngOnInit(): void {

    sessionStorage.setItem('userName',"游客");
    this.idd="游客";
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('userPassword');
  }
}
