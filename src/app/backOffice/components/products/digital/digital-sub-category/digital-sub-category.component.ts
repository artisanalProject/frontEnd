import { Component, OnInit } from '@angular/core';
import { digitalSubCategoryDB } from 'src/app/backOffice/shared/tables/digital-sub-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-digital-sub-category',
  templateUrl: './digital-sub-category.component.html',
  styleUrls: ['./digital-sub-category.component.scss']
})
export class DigitalSubCategoryComponent implements OnInit {
  public closeResult: string;
  public digital_sub_categories = []

  constructor(private modalService: NgbModal) {
    this.digital_sub_categories = digitalSubCategoryDB.digital_sub_category;
  }

 
 


  ngOnInit() {
  }

}
