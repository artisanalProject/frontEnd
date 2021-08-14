import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BlogSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  @Input() blogs: any[] = [];
  articles = []
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getArticles().subscribe(res=>{
      this.articles = JSON.parse(JSON.stringify(res)) 
    })
  }

  public BlogSliderConfig: any = BlogSlider;

}
