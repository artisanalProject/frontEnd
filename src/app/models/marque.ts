import { Category } from './category'
export class Marque{
    
    _id:any;
    name:string;
    category:Category
     constructor(marque){
         marque = marque || {};
         this._id=marque._id 
         this.name=marque.name|| null;
         this.category = marque.category || null;
     }
 }
 
 