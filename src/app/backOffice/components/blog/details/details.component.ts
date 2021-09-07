import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Image } from '@ks89/angular-modal-gallery';
import Swal from "sweetalert2";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
article_id : any;
article: any;
public imagesRect: Image[] = []
  constructor(private route: ActivatedRoute,public dialog: MatDialog,
    private articleService: BlogService,private router : Router) { }

  ngOnInit(): void {
    this.article_id = this.route.snapshot.params.id;
  this.articleService.getArticleById(this.article_id).subscribe(res=>{
    this.article = JSON.parse(JSON.stringify(res))
  },
  err=>{console.log(err);
  },
  ()=>{
    this.imagesRect.push(new Image(0, { img: '/api/'+this.article.image}, { img: '/api/'+this.article.image}))
  })
    
  }


  delete(id){
    Swal.fire({
      title: "êtes-vous sûr de vouloir supprimer cet article?",
      text: "Vous ne serez pas en mesure de récupérer cet article!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.router.navigateByUrl('/blog/listAticle')

          }
        );
        Swal.fire(
          "article supprimée!",
          "cet article a été sypprimer avec succes.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("annulé", "Votre article est en sécurité :)", "error");
      }
    });
  }

}
