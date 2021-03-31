import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ArticleService} from '../../services/article.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../../models/Category';
import {Article} from '../../../models/Article';

@Component({
  selector: 'app-create-edit-article',
  templateUrl: './create-edit-article.component.html',
  styleUrls: ['./create-edit-article.component.css']
})
export class CreateEditArticleComponent implements OnInit {

  categories: Category[];
  title: string;
  article: Article;
  articleForm: FormGroup;
  constructor(public dialog: MatDialog,
              private articleService: ArticleService,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<CreateEditArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    if(data){
      this.article = data;
    }
    this.title = 'Create Article';

    this.articleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        categoryId: new FormControl(''),
        published: new FormControl('')
      });
    }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
      if (this.article){
        this.articleForm = new FormGroup({
          title: new FormControl(`${this.article.title}`),
          description: new FormControl(`${this.article.description}`),
          categoryId: new FormControl(this.article.categoryId),
          published: new FormControl(this.article.published)
        });
      }
    });

  }

  onSend(): void{
    this.dialog.closeAll();
    if (this.data){
        this.articleService.updateArticle(this.data, this.articleForm.value).subscribe(value => console.log(value));
      }else{
        console.log(this.articleForm.value);
        this.articleService.postArticle(this.articleForm.value).subscribe(value => console.log(value));
      }
  }

  close(): void {
    this.dialogRef.close();
  }
}
