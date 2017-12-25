import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Injectable, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";
import {observable} from "rxjs/symbol/observable";
import {Po} from "./Class/Po";
import {Tie} from "./Class/Tie";

@Injectable()
export class MethodService implements OnInit {
  constructor( public http: HttpClient, public routeServe: Router) {}
  private datas: object[];
  private add: string;
  public readeddata: any;
  tie: object;
  rrr: string;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  getPostbyid(id: number): Promise<Po> {
    return this.findAllPosting().then(posts => posts['postthingList'].find(onepost => onepost['poId'] === id));
  }
  getUserPosts(id: number): Promise<Po[]> {
    return this.findAllPosting().then(re => re['postthingList'].find(posts => posts['poUserId'] === id));
  }
  goAddress(address:string, id:string) {
    this.routeServe.navigate([address,id]);
  }
  routeTo(adress:string) {
    this.routeServe.navigate([adress]);
  }
  postData(body: object):any {
    return this.http.post("../assets/package.json", body );
  }
  xiugai(body: object): any {
    return this.http.post('./assets/package.json', body, {params: new HttpParams().set('id','3')});
  }
  addTie(poName:string, poThing:string, id:number):Promise<any> {
    this.tie= {poName:poName,poThing:poThing,poUserId:id};
    return this.http.post("/post_bar/postthing/addPostthing",JSON.stringify(this.tie), {headers:this.headers})
      .toPromise().then(data => this.readeddata = data);
  }
  saveUser(userName:string,userPassword:string): Promise<any> {
    this.tie= {userName:userName,userPassword:userPassword};
    return this.http.post("/post_bar/user/saveUser", JSON.stringify(this.tie),{headers:this.headers})
      .toPromise();
  }
  login(userName:string,userPassword:string): Promise<any> {
    this.tie= {userName:userName,userPassword:userPassword};
    return this.http.post("/post_bar/user/login", JSON.stringify(this.tie),{headers:this.headers})
      .toPromise();
  }
  updatePassword(id:number,userPassword:string):Promise<any> {
    this.tie={id:id,userPassword:userPassword};
    return this.http.post("/post_bar/user/updatePassword",JSON.stringify(this.tie),{headers:this.headers}).toPromise();
  }
  findAllPosting():Promise<any> {
    return this.http.get("/post_bar/postthing/findAllPostthing").toPromise();
  }
  deletePosting(id:string): Promise<any> {
    return this.http.get("/post_bar/postthing/deletePostthing",{params:new HttpParams().set("id",id)}).toPromise();
  }
  findByKey(keyWord:string,userId:number):Promise<any> {
    return this.http.post("/post_bar/postthing/findByKey",JSON.stringify({keyWord:keyWord,userId:userId}),{headers:this.headers})
      .toPromise();
  }
  byDate(userId:string):Promise<any> {
    return this.http.get("/post_bar/postthing/findByDate",{params:new HttpParams().set("userId",userId)}).toPromise();
  }
  addDiss(dis:string,disId:number, disUserId:number):Promise<any> {
    return this.http
      .post("/post_bar/discuss/addDiscuss",JSON.stringify({disThing:dis,disPostId:disId,disUserId:disUserId }),{headers:this.headers})
      .toPromise();
  }
  deleDis(id:string):Promise<any> {
    return this.http.get("/post_bar/discuss/deleteDiscuss?id="+id).toPromise();
  }
  ngOnInit() {
  }
}
