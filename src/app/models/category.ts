export class Category{
    
   _id:any;
   name:string;
   marque:Marque[]
    constructor(category){
        category = category || {};
        this._id=category._id 
        this.name=category.name|| null;
        this.marque= category.marque || []
    }
}

export class Marque{
    _id:any;
    name:string;
 }
