import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service'
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Book from '../Book';

@Component({
  selector: 'app-book-get',
  templateUrl: './book-get.component.html',
  styleUrls: ['./book-get.component.sass']
})
export class BookGetComponent implements OnInit {

  books: Observable<Book[]>;
  angForm: FormGroup;  

  constructor(private fb: FormBuilder, private bs: BooksService, private router: Router) { 
    this.createForm();  
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.books = this.bs.getBooks();
  }

  deleteBook(name, author) {
    this.bs.deleteBook(name, author)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  viewBook(name) {
    this.router.navigate(['bookInfo', name]);
  }

  bookDetails(id: number){
    this.router.navigate(['details', id]);
  }

  createForm() {  
    this.angForm = this.fb.group({  
      BookName: ['', Validators.required ],  
      BookAuthor: ['', Validators.required ]  
    });  
  }

  addBook(BookName, BookAuthor) {  
    this.bs.addBook(BookName, BookAuthor).subscribe(
      data => {
        this.angForm.reset();
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }  
}
