import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  blogForm: FormGroup;
  files: File[] = [];
  id: any
  article:any
  image:any;
  formData: FormData = new FormData();
  responseUpdate: any;
  removeImage= false;
  constructor(private BlogService: BlogService,  private _snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
   this.BlogService.getArticleById(this.id).subscribe(res=>{     
    this.article = JSON.parse(JSON.stringify(res))
   
   },
   err=>{console.log(err);
   },
   ()=>{
   
   
     this.image = this.article.image
    this.blogForm = new FormGroup({
      title: new FormControl(this.article.title, Validators.required),
      content: new FormControl(this.article.content, Validators.required),
    });
   })
    
   
  }
  onSelect(event) {
    if (!this.image && this.files.length <1){
      this.files.push(...event.addedFiles);
      this.image = this.files[0]
      console.log(this.image);
      
    }
   
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  close(){
    this.image = null;
    this.removeImage = true
  }



  updateArticle() {
    var data = this.blogForm.getRawValue();
   

    this.formData.set("title", data.title);
    this.formData.set("content", data.content);
    this.formData.set("image",this.image);

    this.BlogService
      .updateArticle(this.formData,this.id)
      .subscribe(
        (res) => {
          this.responseUpdate = res;
        },
        (err) => {
          console.log(err);
          
        },
        () => {
          if (this.responseUpdate.message == "updated successfully") {
            this._snackBar.open("article modifié avec succès", "OK", {
              verticalPosition: "top",
              duration: 2000,
            });
            // // Change the location with new one
            this.router.navigateByUrl("/blog/listAticle");
          } else {
            this._snackBar.open("Réessayez", "OK", {
              verticalPosition: "top",
              duration: 2000,
            });
          }
        }
      );
  }
}
