import {Component, OnInit} from "@angular/core";
import {MethodService} from "./method.service";
import {ActivatedRoute, ParamMap, Params, Resolve} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Po} from "./Class/Po";
import {Tie} from "./Class/Tie";
import 'rxjs/add/operator/toPromise';

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
  poId:string;
  tieji:Po[];
  D: any;
  constructor(private aroute:ActivatedRoute, private m:MethodService) {}
  onSelect() {
    this.flag = !this.flag;
  }
  getId(id:string):Promise<string> {
    this.poId=id;
    return Promise.resolve(id);
  }
  getPostById(id:number):Promise<Po> {
    return Promise.resolve(this.tieji.find(post => post.poId === id));
  }
  ngOnInit() {
    this.title='evedetail';
    this.flag=true;
    this.m.findAllPosting().then(data => { this.tieji = data['postthingList'];});
    this.aroute.paramMap.switchMap((params: ParamMap) =>  this.m.getPostbyid(+params.get('id')))
       .subscribe(data => this.onepost=data);

  }
}
