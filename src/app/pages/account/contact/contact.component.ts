import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "ngx-snackbar";
import { ToastrService } from "ngx-toastr";
import { ContactService } from "src/app/shared/services/contact.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  showSnackBar = false;
  constructor(
    private cs: ContactService,
    private snackbarService: SnackbarService,
    private toastr: ToastrService
  ) {}
  contactForm: FormGroup;
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required),
    });
  }
  sendMessage() {
    this.cs.addContact(this.contactForm.value).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this.cs.nbNotifEmails();
        Swal.fire({
          title: "Message sent successfully",
          text: "we will treat your request as soon as possible!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.ngOnInit();
        });
      }
    );
  }
}
