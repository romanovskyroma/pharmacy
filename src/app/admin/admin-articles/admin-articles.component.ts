import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminArticlesComponent implements OnInit {
  addArticles: boolean;
  articles: IArticle[] = [];
  updArt: boolean;
  addArt: boolean;
  error: boolean;



  article: IArticle = {
    id: '',
    title: '',
    author: '',
    text: '',
    date: ''
  }

  constructor(public articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  showAddArticles(): void {
    this.error = false;
    this.addArt = true;
    this.updArt = false;
    this.addArticles = true;
    this.resetForm();
  }

  closeArticle(): void {
    this.addArticles = false;
    this.addArt = false;
    this.updArt = false;
  }

  private getArticles() {
    this.articleService.getFSArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  addArticle(): void {
    if (this.article.title.trim() != '' && this.article.author.trim() != '' && this.article.text.trim() != '') {
      this.article.date = new Date().toString();
      delete (this.article.id);
      this.articleService.addFSArticle(this.article);
      this.resetForm();
    } else {
      this.error = true;
    }

  }

  delArticle(id: string) {
    this.articleService.deleteFSArticle(id);
  }

  editArticle(article: IArticle): void {
    this.article = article;
    this.addArticles = true;
    window.scroll(0, 300);
    if (article.id) {
      this.addArt = false;
      this.updArt = true;
    }
  }

  updateArticle(): void {
    console.log(this.article);
    this.articleService.updateFSArticle(this.article.id, this.article);
    this.resetForm();
    this.addArticles = false; 
  }

  resetForm(): void {
    this.article.id = '';
    this.article.title = '';
    this.article.author = '';
    this.article.text = '';
    this.article.date = '';
  }





}
