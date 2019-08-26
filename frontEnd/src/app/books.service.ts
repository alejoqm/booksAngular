import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  uri = 'http://localhost:3000/books';  

  constructor(private http: HttpClient) { }

  addBook(BookName, BookAuthor) : Observable<any>{  
    const obj = {  
      'title': BookName,  
      'author': BookAuthor
    };  
    console.log(obj);  
    return this.http.post(`${this.uri}`, obj);  
  }
  
  getBooks() : Observable<any> {
    return this.http.get(`${this.uri}`);
  }

  deleteBook(title: string, author: string): Observable<any> {
    return this.http.delete(`${this.uri}/${title}/${author}`, { responseType: 'text' });
  }
}
