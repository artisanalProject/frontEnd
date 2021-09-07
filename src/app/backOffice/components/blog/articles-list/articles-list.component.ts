import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article';
import { BlogService } from 'src/app/services/blog.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  listArticles = []
  constructor(private articleService : BlogService,  private _snackBar: MatSnackBar) { }
  dataSource: MatTableDataSource<Article>;
  displayedColumns: string[] = [
    "titre",
    "comments",
    "hits",
    "buttons",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      (result) => {
        this.listArticles = JSON.parse(JSON.stringify(result));
      },
      (e) => {
        console.log(e);
      },

      () => {
        this.dataSource = new MatTableDataSource(this.listArticles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
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
            this.ngOnInit();
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


  
  removeFromFavoris(article) {
    this.articleService.removeFromFavoris(article._id).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this._snackBar.open("article retiré de la liste des favoris", "OK", {
          verticalPosition: "top",
          duration: 2000,
        });
        this.ngOnInit();
      }
    );
  }
  addToFavoris(article) {
    this.articleService.addToFavoris(article._id).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this._snackBar.open("article aujouté à la liste des favoris", "OK", {
          verticalPosition: "top",
          duration: 2000,
        });
       this.ngOnInit()
      }
    );
  }

}
