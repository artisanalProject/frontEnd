import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  blogForm: FormGroup;
  files: File[] = [];
  formData: FormData = new FormData();
  submitted = false;
  constructor(private BlogService: BlogService,  private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.blogForm = new FormGroup({
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
    });
  }
  

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  addArticle(){
    this.submitted = true;
    var data = this.blogForm.getRawValue();
    console.log(data);

    this.formData.set("title", data.title);
    this.formData.set("content", data.content);
        this.formData.append("image", this.files[0]);
    
    this.BlogService.addArticle(this.formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // Show the success message
        this._snackBar.open("Product added", "OK", {
          verticalPosition: "top",
          duration: 2000,
        });
        // // Change the location with new one
        this.router.navigateByUrl("/blog/listAticle");
      }
    );
  }

}
