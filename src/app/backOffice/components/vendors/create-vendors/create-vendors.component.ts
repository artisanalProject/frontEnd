import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { artisanService } from "src/app/services/artisanService";
import Swal from "sweetalert2";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-create-vendors",
  templateUrl: "./create-vendors.component.html",
  styleUrls: ["./create-vendors.component.scss"],
})
export class CreateVendorsComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  result = "";
  constructor(
    private as: artisanService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  save() {
    console.log(this.accountForm.status);

    if (this.accountForm.status != "INVALID") {
      this.as.createArtisant(this.accountForm.value).subscribe(
        (res) => {
          this.result = JSON.parse(JSON.stringify(res));
        },
        (err) => {},
        () => {
          if (this.result == "account already exist") {
            Swal.fire("Oops...", "compte déja existe!", "error");
          } else {
            this._snackBar.open("Artisant ajouté avec succes", "OK", {
              verticalPosition: "top",
              duration: 2000,
            });
            this.router.navigate(["vendors/list-vendors"]);
          }
        }
      );
    } else {
      this._snackBar.open(
        "Vous devez remplir tous les champs obligatoire",
        "OK",
        {
          verticalPosition: "top",
          duration: 2000,
        }
      );
    }
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      phoneNumber: new FormControl(""),
      address: new FormControl(""),
      storeName: new FormControl(""),
    });
    console.log(this.accountForm.controls["password"].dirty);
  }
}
