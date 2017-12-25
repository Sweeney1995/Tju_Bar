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
  onepost:Po;
  flag:boolean;
  flag2:boolean;
  poId:string;
  tieji:Po[];
  disThing:string;
  dis:Dis[];
  constructor(private aroute:ActivatedRoute, private m:MethodService) {}
  onSelect() {
    this.flag = !this.flag;
  }
  addDis() {
    this.m.addDiss(this.disThing,this.onepost.poId,parseInt(sessionStorage.getItem('id')))
      .then(() => this.flag=false);
  }
  deleDis(id:string) {
    this.m.deleDis(id).then(data => { if(data === 1) {alert("删除评论成功！");}});
  }
  delePost(id:string) {
    this.m.deletePosting(id).then(data => { if(data === 1) {alert("删帖成功！");}});
  }
  ngOnInit() {
    this.title='evedetail';
    this.flag=false;
    this.flag2=false;
    this.m.findAllPosting().then(data => { this.tieji = data['postthingList'];});
    this.aroute.paramMap.switchMap((params: ParamMap) =>  this.m.getPostbyid(+params.get('id')))
       .subscribe(data => {this.onepost=data;this.dis=this.onepost.discussList;this.dis=this.onepost.discussList;
       if(this.onepost.poUserId.toString(10) === sessionStorage.getItem('id')) {this.flag2=true;}});

  }
}
