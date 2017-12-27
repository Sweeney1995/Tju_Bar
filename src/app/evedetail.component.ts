import {Component, OnInit} from "@angular/core";
import {MethodService} from "./method.service";
import {ActivatedRoute, ParamMap, Params, Resolve} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Po} from "./Class/Po";
import {Tie} from "./Class/Tie";
import 'rxjs/add/operator/toPromise';
import {Dis} from "./Class/Dis";

@Component(
  {
    selector:'app-eve',
    templateUrl:'./evedetail.component.html',
    styleUrls:['./evedetail.component.css']
  }
)
export class EvedetailComponent implements OnInit {
  title:string;
  loginUserId:number;
  onepost:Po;
  flag:boolean;
  flag2:boolean;
  poId:number;
  tieji:Po[];
  disThing:string;
  dis:Dis[];
  constructor(private aroute:ActivatedRoute, private m:MethodService) {}
  onSelect() {
    if(sessionStorage.getItem('userName') !== "游客") {
    this.flag = !this.flag; } else { alert("登录才可以评论~");}
  }
  addDis() {
    this.m.addDiss(this.disThing,this.onepost.poId,+sessionStorage.getItem('id'))
      .then(() => {this.m.getPostbyid(this.poId).then(data => {this.onepost=data;this.dis=this.onepost.discussList;
        if(this.onepost.poUserId.toString(10) === sessionStorage.getItem('id')) {this.flag2=true;}});this.flag=false;});
  }
  deleDis(id:string) {
    this.m.deleDis(id).then(data => { if(data === 1) {alert("删除评论成功！");} else {alert("请求未成功");}});
  }
  delePost(id:string) {
    this.m.deletePosting(id).then(data => { if(data === 1) {alert("删帖成功！");} else {alert("请求未成功");}});
  }
  getPoId(poId:number): Promise<number> {
    return Promise.resolve(this.poId=poId);
  }
  ngOnInit() {
    this.title='evedetail';
    this.flag=false;
    this.flag2=false;
    this.loginUserId=parseInt(sessionStorage.getItem('id'));
    this.aroute.paramMap.switchMap((params: ParamMap) =>  this.getPoId(+params.get('id')))
       .subscribe(data => this.poId=data);
    this.m.getPostbyid(this.poId).then(data => {this.onepost=data;this.dis=this.onepost.discussList;
      if(this.onepost.poUserId.toString(10) === sessionStorage.getItem('id')) {this.flag2=true;}});
  }
}
