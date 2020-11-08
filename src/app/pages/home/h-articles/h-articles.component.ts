import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-h-articles',
  templateUrl: './h-articles.component.html',
  styleUrls: ['./h-articles.component.scss']
})
export class HArticlesComponent implements OnInit {
  articles: IArticle[];
  p: number = 1; 

  constructor(public articleService: ArticlesService) { }

  ngOnInit(): void {  
    this.getArticles(); 
  }

  private getArticles() {
    this.articleService.getFSArticles().subscribe(data => {
      this.articles = data;
    }); 
  }


}
