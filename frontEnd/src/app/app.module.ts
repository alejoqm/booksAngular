import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BooksService} from './books.service';
import { BookGetComponent } from './book-get/book-get.component';

@NgModule({
  declarations: [
    AppComponent,
    BookViewComponent,
    BookGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  providers: [    
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
