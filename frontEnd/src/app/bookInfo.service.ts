import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {
  uri = 'http://localhost:3000/bookInfo';  

  constructor(private http: HttpClient) { }

  getInfo(title) : Observable<any> {
    console.log("Service " + title);
    return this.http.get(`${this.uri}/${title}`);
  }
}
