

export class Article{
    
    _id:any;
    title:string;
    content:string;
    image:string;
    comment:string[];
    hits:number;
    top: boolean;
     constructor(article){
         this._id=article._id 
         this.title=article.title|| null;
         this.content= article.content;
         this.image= article.image;
         this.comment = article.comment;
         this.hits = article.hits;
         this.top = article.top;

     }
 }


