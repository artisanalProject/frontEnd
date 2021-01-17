import { Artisant } from './artisant';
import { Category } from './category'
import { Collections } from './collections';
export class Product {
    _id :number;
    name: string;
    price: number;
    quantity: number;
    images: string;
    status: string;
    createdByAdmin: boolean;
    description:string;
    tva : string;
    remise: number;
    creationDate:Date;
    topProduct:boolean;
    category: string;
    marque:string;
    collections: Collections;
    artisant:Artisant;
    public Product (name:string, price:number, quantity:number,images:string,status:string,createdByAdmin:boolean,tva:number, tv:number,creationDate:Date,category: string,
        marque:string,
        collections: Collections,
        artisant:Artisant,
        topProduct:boolean, description:string){
            this.name= name;
            this.price= price;
            this.quantity = quantity;
            this.images = images;
            this.status = status;
            this.creationDate=creationDate;
            this.createdByAdmin = createdByAdmin;
            this.category=category;
            this.marque = marque;
            this.collections= collections;
            this.artisant= artisant;
            this.topProduct = topProduct;
            this.description = description

      
    }
}

