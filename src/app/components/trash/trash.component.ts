import { Component, OnInit } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { HttpService } from "../../service/http/http.service";
import { from } from "rxjs";

@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.scss"]
})
export class TrashComponent implements OnInit {
  constructor(
    private noteService: NoteServiceService,
    public http: HttpService
  ) { }

  more = "trash";
  trash = "trash";
  deletedcards = [];
  card = [];
  cards = [];

  wrap: string = "wrap";
  direction;
  view;
  layout;

  ngOnInit() {
    this.deleteNote();
    this.noteService.getView().subscribe((res: any) => {
      // debugger
      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    });
  }

  deleteNote() {
    this.http.getHttp("getNotes").subscribe(data => {
      this.card = data["data"];
      console.log(this.card);
      for (let i = 0; i < this.card.length; i++) {
        if (this.card[i].trash) {
          console.log("Entered");
          this.deletedcards.push(this.card[i]);
          console.log(this.deletedcards);
        }
      }
    }),
      err => {
        console.log(err);
      };
  }

  // deleteNote(card) {
  //   this.notes
  //     .deleteNote({
  //       trash: true,
  //       noteID: [card._id]
  //     })
  //     .subscribe(
  //       data => {
  //         console.log(data, "When note is trashed");
  //         let ind = this.card.indexOf(card);
  //         this.deletedcards.splice(ind, 1);
  //       },
  //       err => console.log(err)
  //     );
  // }
  // restore(array) {
  //   this.notes
  //     .deleteNote({
  //       trash: false,
  //       noteID: [array._id]
  //     })
  //     .subscribe(data => {
  //       console.log(data, "when note is restored");
  //       let index = this.deletedcards.indexOf(array);
  //       this.deletedcards.splice(index, 1);
  //     }),
  //     err => console.log(err);
  // }
}
