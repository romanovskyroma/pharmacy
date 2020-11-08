import { Injectable } from '@angular/core';
import { IArticle } from '../interfaces/article.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ArticlesService {
  articlesColection: AngularFirestoreCollection<IArticle>;
  articles: Observable<IArticle[]>;
  itemDoc: AngularFirestoreDocument<IArticle>;

  constructor(public firestore: AngularFirestore) {
    this.articlesColection = this.firestore.collection<IArticle>('articles');
    this.articles = this.articlesColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IArticle;
        const id = a.payload.doc.id;
        return { id, ...data }
      }) 
    }) 
  }

  getFSArticles(): Observable<IArticle[]> {
    return this.articles;
  }

  addFSArticle(article: IArticle): void {
    this.articlesColection.add(article);
  }

  deleteFSArticle(id: string) {
    return this.articlesColection.doc(id).delete();
  }

  updateFSArticle(id: string, article: IArticle) {
    const doc = this.articlesColection.doc(id);
    return doc.update(article);  
  }

  getOneArticle(id: string) {
    this.itemDoc = this.firestore.doc<IArticle>('articles/' + id);
    const item = this.itemDoc.valueChanges();
    return item; 
  } 




}
