import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookViewComponent } from './book-view/book-view.component';  
import { BookGetComponent } from './book-get/book-get.component';

const routes: Routes = [
  {  
    path: 'bookInfo/:bookTitle',  
    component: BookViewComponent  
  },
  {
    path: 'books',
    component: BookGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
