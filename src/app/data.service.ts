import {Injectable, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

const H: string[] = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

@Injectable()
export class DataService {
  public gg: object[];
  constructor(private http2: Http, private http3: HttpClient) {}
  getDatas(): Promise<string[]> {
    return Promise.resolve(H);
  }
  getData(id: number ): Promise<string> {
    return Promise.resolve(H[id]);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
