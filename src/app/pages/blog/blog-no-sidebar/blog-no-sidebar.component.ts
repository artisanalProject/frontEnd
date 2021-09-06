import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-no-sidebar',
  templateUrl: './blog-no-sidebar.component.html',
  styleUrls: ['./blog-no-sidebar.component.scss']
})
export class BlogNoSidebarComponent implements OnInit {
 articles = []
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getArticles().subscribe(res=>{
      this.articles = JSON.parse(JSON.stringify(res)) 
    })
  }
 
}
