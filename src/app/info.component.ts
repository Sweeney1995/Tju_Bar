import {Component, OnInit} from "@angular/core";
import {MethodService} from "./method.service";
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Tie} from "./Class/Tie";
import {Po} from "./Class/Po";

const HEROES: Tie[] = [
  {  tieba: '学习吧' , zhuti: '注会、中级、英语资料',shijian:'3分钟前' },
  {  tieba: '学习吧' , zhuti: '初学UI设计需要了解的事儿',shijian:'5分钟前' },
  {  tieba: '学习吧' , zhuti: '明天要考研了',shijian:'6分钟前' },
  {  tieba: '学习吧' , zhuti: '你不笨，就是懒',shijian:'9分钟前' },
  {  tieba: '学习吧' , zhuti: '政治资料',shijian:'12分钟前' }
];
@Component(
  {
    selector:'app-info',
    templateUrl:'./info.component.html',
    styleUrls:['./info.component.css']
  }
)
export class InfoComponent implements OnInit {
  title: string;
  heroes: Tie[];
  userPosts: Po[];
  tieji: Po[];
  flag: boolean;
  userId: number;
  userName:string;
  constructor(private m: MethodService, private acroute: ActivatedRoute) {
  }

  isShow(id: number) {
    if (+sessionStorage.getItem('id') !== id) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  delePost(id: string) {
    this.m.deletePosting(id);
  }
  goDetailbyId(poid:string) {
    this.m.goAddress('eve',poid);
  }
  goInde() {
    this.m.routeTo('inde');
  }
  goPerinfog() {
    this.m.routeTo('perinfog');
  }
  ngOnInit() {
    this.heroes = HEROES;
    this.flag = true;
    this.userName=sessionStorage.getItem('userName');
    this.userId = (+sessionStorage.getItem('id'));
    this.title = sessionStorage.getItem('userName');
    this.m.findAllPosting().then(datas => this.userPosts = datas['postthingList']);
  }
}
