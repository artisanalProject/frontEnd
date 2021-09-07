import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContactService } from "src/app/shared/services/contact.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnInit {
  id: String;
  message : any;
  constructor(private route: ActivatedRoute, private cs: ContactService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.cs.getContactById(this.id).subscribe(
      (res) => {
        this.message = JSON.parse(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.cs.changeStatus(this.id).subscribe((res) => {
          console.log(res);
        });
      }
    );
  }
}
