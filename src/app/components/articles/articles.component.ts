import {Component, ElementRef, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Category} from '../../../models/Category';
import {CreateEditArticleComponent} from '../create-edit-article/create-edit-article.component';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../services/category.service';
import {Article} from '../../../models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  categories: Category[];
  type: string;
  selectedCategory: any; // Бо може бути і string
  categoryEmpty: boolean;
  typeEmpty: boolean;
  constructor(private articleService: ArticleService, private categoryService: CategoryService, public dialog: MatDialog) {
    this.type = 'all';
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(value => this.articles = value);
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  sortBy(type): void {
    this.typeEmpty = false;
    this.selectedCategory = type;
    this.type = null;
    if (type !== 'all'){
      this.articleService.getArticlesByCategory(type._id).subscribe(value => {
        this.articles = value;
        if (value.length === 0){
          this.categoryEmpty = true;
        }else{
          this.categoryEmpty = false;
        }
      });
    }else{
      this.showArticles('all');
    }
      // this.articleService.getArticles(this.type).subscribe(value => {
      //   if (type !== 'all'){
      //     this.articles = value.filter(value1 => value1.categoryId === type._id);
      //   }else{
      //     this.articles = value;
      //   }
      // });
  }

  showArticles(type): void{
    this.categoryEmpty = false;
    this.type = type;
    this.selectedCategory = null;
    switch (type){
      case 'all':
        this.articleService.getAllArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            this.typeEmpty = true;
          }else{
            this.typeEmpty = false;
          }
        });
        break;
      case 'published':
        this.articleService.getPublishedArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            this.typeEmpty = true;
          }else{
            this.typeEmpty = false;
          }
        });
        break;
      case 'unpublished':
        this.articleService.getUnPublishedArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            this.typeEmpty = true;
          }else{
            this.typeEmpty = false;
          }
        });
        break;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditArticleComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.showArticles(this.type);
      if (result !== undefined) {
        if (result !== 'no') {
          console.log(result);
        } else if (result === 'no') {
          console.log('User clicked no.');
        }
      }
    });
  }


  updateArticles(): void {
   if (this.selectedCategory){
     this.sortBy(this.selectedCategory);
   }
   if (this.type){
     this.showArticles(this.type);
   }
  }
}
