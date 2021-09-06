import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  constructor(private router : ActivatedRoute, private blogService: BlogService, private toastr: ToastrService) { }
  id : any;
  ReviewForm : FormGroup
  article : any;
  ngOnInit(): void {
    this.id = this.router.snapshot.params.id
    this.blogService.getArticleById(this.id).subscribe(res=>{
     this.article = JSON.parse(JSON.stringify(res))
      
    },err=>{},()=>{
      this.blogService.addHit(this.id).subscribe(res=>{
        console.log(res);
        
      })
    })
    this.ReviewForm = new FormGroup({
      name : new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email]),
      comment: new FormControl('',Validators.required),
    })
   
    
  }
  submitComment(){
   this.blogService.addComment(this.id,this.ReviewForm.value).subscribe(res=>{
     
   },
   err=>{console.log(err);
   },
   ()=>{
    this.toastr.success('your comment is sent successefully', 'comment sent!');
    this.ReviewForm.reset()
  })
   }
   
   
 

}
