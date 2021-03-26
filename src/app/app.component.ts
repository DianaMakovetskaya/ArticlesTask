import {Component, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ArticleService} from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task1';

  constructor() {}

  // check(type): void {
  //  switch (type){
  //    case 'all':
  //      this.router.navigate([`/articles`], {relativeTo: this.activatedRoute});
  //      break;
  //    case 'published':
  //      this.router.navigate([`/articles/published`], {relativeTo: this.activatedRoute});
  //      break;
  //    case 'unpublished':
  //      this.router.navigate([`/articles/unpublished`], {relativeTo: this.activatedRoute});
  //      break;
  //  }
  // }

  // openDialog(): void {
  //   // const dialogRef = this.dialog.open(this.callAPIDialog);
  //   const dialogRef = this.dialog.open(CreateEditArticleComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       if (result !== 'no') {
  //         console.log(result);
  //       } else if (result === 'no') {
  //         console.log('User clicked no.');
  //       }
  //     }
  //   });

}
