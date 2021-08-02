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
@Component({
  selector: "app-create-vendors",
  templateUrl: "./create-vendors.component.html",
  styleUrls: ["./create-vendors.component.scss"],
})
export class CreateVendorsComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  result = "";
  constructor(private as: artisanService, public router: Router) {}

  save() {
    this.as.createArtisant(this.accountForm.value).subscribe(
      (res) => {
        this.result = JSON.parse(JSON.stringify(res));
      },
      (err) => {},
      () => {
        if (this.result == "account already exist") {
          Swal.fire("Oops...", "compte déja existe!", "error");
        } else if (this.accountForm.valid) {
          this.router.navigate(["vendors/list-vendors"]);
        }
      }
    );
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
  }
}
