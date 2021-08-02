import { Component, OnInit, ViewChild } from '@angular/core';
import { vendorsDB } from '../../../shared/tables/vendor-list';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ArtisantService } from 'src/app/shared/services/artisant.service';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.scss']
})
export class ListVendorsComponent implements OnInit {
  public listArtisant = [];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'email','phoneNumber','address','storeName','buttons'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private as: ArtisantService) {
   
  }

  ngOnInit() {
    this.getAllArtisant()
  }
  getAllArtisant(){
   
    this.as.getArtisant().subscribe(
      result => {
        this.listArtisant = JSON.parse(JSON.stringify(result));       
      },
      e => {console.log(e);
       },

  ()=>{ 
    this.dataSource = new MatTableDataSource(this.listArtisant);
    this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
  });
  }
  ngAfterViewInit() {
    
  }
  applyFilter($event){
    
  }

}
