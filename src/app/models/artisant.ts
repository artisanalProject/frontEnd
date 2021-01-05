import { Product } from "./product";

export class Artisant{
    
    _id:any;
    name:string;
    email:string
    phoneNumber:string;
    address:string;
    storeName:string;
    typeOfWork:string;
    codePostale:string;
    cin:string;
    creationDate:Date;
     constructor(artisant){
         this._id=artisant._id 
         this.name=artisant.name|| null;
         this.email= artisant.email;
         this.phoneNumber= artisant.phoneNumber;
         this.address = artisant.address;
         this.storeName = artisant.storeName;
         this.typeOfWork = artisant.typeOfWork;
         this.codePostale = artisant.codePostale;
         this.cin = artisant.cin;
         this.creationDate = artisant.crationDate;

     }
 }


