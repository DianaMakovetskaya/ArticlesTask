import {Component, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {CreateEditArticleComponent} from '../create-edit-article/create-edit-article.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EventEmitter} from '@angular/core';
import {ArticlesComponent} from '../articles/articles.component';
import {CategoryService} from '../../services/category.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: any;
  published: false;
  category: string;
  @Output() ItemEvent = new EventEmitter<string>();
  constructor(private articleService: ArticleService, private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.article.categoryId).subscribe(value => this.category = value.name);
  }

  publish(event): void {
    event.stopPropagation();
    this.articleService.publishArticle(this.article).subscribe(value =>{
      this.ItemEvent.emit(this.article);
      console.log(value);
    });
  }

  unpublish(event): void {
    event.stopPropagation();
    this.articleService.unpublishArticle(this.article).subscribe(value => {
      this.ItemEvent.emit(this.article);
      console.log(value);
    });
  }

  delete(event): void {
    event.stopPropagation();
    this.articleService.deleteArticle(this.article).subscribe(value => {
      console.log(value);
      this.ItemEvent.emit(this.article);
    });
  }

  edit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.article;
    const dialogRef = this.dialog.open(CreateEditArticleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.ItemEvent.emit(this.article);
      if (result !== undefined) {
        if (result !== 'no') {
          console.log(result);
        } else if (result === 'no') {
          console.log('User clicked no.');
        }
      }
    });

  }
}
