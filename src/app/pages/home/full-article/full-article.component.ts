import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.scss']
})

export class FullArticleComponent implements OnInit {
  oneArticle: IArticle;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData(); 
  }  

  getData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articlesService.getOneArticle(id).forEach(data => {
      this.oneArticle = data;
      console.log(this.oneArticle);
        
    })
  }
  
}
