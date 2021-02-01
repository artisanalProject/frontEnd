import { Artisant } from './artisant';
import { Category } from './category'
import { Collections } from './collections';
import { Marque } from './marque';
export class Product {
    _id :number;
    name: string;
    price: number;
    stock: number;
    quantity:number;
    images: string;
    status: string;
    createdByAdmin: boolean;
    description:string;
    remise: number;
    creationDate:Date;
    topProduct:boolean;
    category: Category;
    marque:Marque;
    collections: Collections;
    artisant:Artisant;
    new : boolean;
    sellingNumber:number;
    public Product (name:string, price:number,remise:number, quantity:number,images:string,status:string,createdByAdmin:boolean,creationDate:Date,category: Category,
        marque:Marque,
        collections: Collections,
        artisant:Artisant,
        topProduct:boolean, description:string){
            this.remise= remise;
            this.name= name;
            this.price= price;
            this.quantity = quantity;
            this.images = images;
            this.status = status;
            this.creationDate=creationDate;
            this.createdByAdmin = createdByAdmin;
            this.category=category || null;
            this.marque = marque || null;
            this.collections= collections || null;
            this.artisant= artisant || null;
            this.topProduct = topProduct;
            this.description = description

      
    }
}

