import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ArticleService} from '../../services/article.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-create-edit-article',
  templateUrl: './create-edit-article.component.html',
  styleUrls: ['./create-edit-article.component.css']
})
export class CreateEditArticleComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  categories: any[];
  title: string;

  articleForm: FormGroup;
  constructor(public dialog: MatDialog,
              private articleService: ArticleService,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<CreateEditArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data){
      this.title = 'Edit Article';
      this.articleForm = new FormGroup({
        title: new FormControl(`${data.title}`),
        description: new FormControl(`${data.description}`),
        categoryId: new FormControl(''),
        published: new FormControl(data.published)
      });
    }else{
      this.title = 'Create Article';

      this.articleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        categoryId: new FormControl(''),
        published: new FormControl('')
      });
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  onSend(): void{
    if (this.articleForm.status === 'INVALID')
    {
      console.log('form is invalid');
    }else{
      this.dialog.closeAll();
      if (this.data){
        this.articleService.updateArticle(this.data, this.articleForm.value).subscribe(value => console.log(value));
      }else{
        console.log(this.articleForm.value);
        this.articleService.postArticle(this.articleForm.value).subscribe(value => console.log(value));
      }
    }

  }

  close(): void {
    this.dialogRef.close();
  }
}
