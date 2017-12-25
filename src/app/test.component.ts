import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { MethodService} from "./method.service";
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
  onSelect() {
    this.flag=!this.flag;
  }
  goBack() {
    this.loca.back();
  }
  goDetail() {
    this.rout.navigate(['eve',"test"]);
  }
  addTie() {
    this.m.addTie(this.tieName,this.tieThing,this.userId).then(data => this.re =data);
  }
  ngOnInit(): void {
      this.flag=true;
      this.userId=parseInt(sessionStorage.getItem('id'));
}
}
