import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/Category';
import {Article} from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }


  getArticlesByCategory(categoryId): Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${this.baseUrl}/api/articles/category/${categoryId}`);
  }

  getAllArticles(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseUrl}/api/articles`);
  }

  getPublishedArticles(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${this.baseUrl}/api/articles/published`);
  }
  getUnPublishedArticles(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${this.baseUrl}/api/articles/unpublished`);
  }

  postArticle(article): Observable<Article[]>{
    return this.httpClient.post<Article[]>(`${this.baseUrl}/api/articles`, article);
  }
  updateArticle(oldArticle, newArticle): Observable<any[]>{
    return this.httpClient.put<Article[]>(`${this.baseUrl}/api/articles/${oldArticle.id}`, newArticle);
  }
  publishArticle(article): Observable<Article[]>{
    return this.httpClient.post<Article[]>(`${this.baseUrl}/api/articles/publish/${article.id}`, article);
  }
  unpublishArticle(article): Observable<Article[]>{
    return this.httpClient.post<Article[]>(`${this.baseUrl}/api/articles/unpublish/${article.id}`, article);
  }
  deleteArticle(article): Observable<Article[]>{
    return this.httpClient.delete<Article[]>(`${this.baseUrl}/api/articles/${article.id}`);
  }

}
