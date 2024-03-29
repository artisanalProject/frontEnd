import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/images/icon/logo.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True
  categories : any 
  public today: number = Date.now();

  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = JSON.parse(JSON.stringify(res))
    })
  }

}
