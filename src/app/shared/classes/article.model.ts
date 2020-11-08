import { IArticle } from '../interfaces/article.interface';

export class Article implements IArticle {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public text: string,
        public date: string,
    ) { }
}