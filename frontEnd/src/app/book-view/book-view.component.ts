import { Component, OnInit } from '@angular/core';  
import { BookInfoService } from '../bookInfo.service'
import BookInfo from '../BookInfo';
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.sass']
})
export class BookViewComponent implements OnInit {

  bookInfo: Observable<BookInfo []>;

  constructor(private bis: BookInfoService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.getBookInfo();
  }

  reloadData(info) {
    this.bookInfo = info;
  }

  getBookInfo() {
    this.route.paramMap.subscribe(params => {
      this.bis.getInfo(params.get('bookTitle'))
      .subscribe(
        data => {
           this.bookInfo  = data;
        },
        error => console.log(error));
    });
  }


}
