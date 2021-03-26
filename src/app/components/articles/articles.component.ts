import {Component, ElementRef, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Category} from '../../../models/Category';
import {CreateEditArticleComponent} from '../create-edit-article/create-edit-article.component';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: any[];
  categories: Category[];
  type: string;
  constructor(private articleService: ArticleService, private categoryService: CategoryService, public dialog: MatDialog) {
    this.type = 'all';
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(value => this.articles = value);
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  sortBy(type): void {
    const el = document.getElementById('CategoryError');
    document.getElementById('TypeError').style.display = 'none';
    el.style.display = 'none';
    if (type !== 'all'){
      this.articleService.getArticlesByCategory(type._id).subscribe(value => {
        this.articles = value;
        if (value.length === 0){
          el.textContent = `Статей в категорії "${type.name}" немає(((`;
          el.style.display = 'block';
        }
      });
    }else{
      this.showArticles(this.type);
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
    const el = document.getElementById('TypeError');
    document.getElementById('CategoryError').style.display = 'none';
    el.style.display = 'none';
    switch (type){
      case 'all':
        this.articleService.getAllArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            el.textContent = `Статей з типом "${type}" немає(((`;
            el.style.display = 'block';
          }
        });
        break;
      case 'published':
        this.articleService.getPublishedArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            el.textContent = `Статей з типом "${type}" немає(((`;
            el.style.display = 'block';
          }
        });
        break;
      case 'unpublished':
        this.articleService.getUnPublishedArticles().subscribe(value => {
          this.articles = value;
          if (value.length === 0){
            el.textContent = `Статей з типом "${type}" немає(((`;
            el.style.display = 'block';
          }
        });
        break;
    }
    this.type = type;
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


}
