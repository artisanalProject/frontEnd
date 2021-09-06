import { Product } from "./product";

export class Collections{
    
    _id:any;
    name:string;
    description:string
    product:[Product]
     constructor(collection){
         this._id=collection._id 
         this.name=collection.name|| null;
         this.description= collection.description || []
     }
 }
