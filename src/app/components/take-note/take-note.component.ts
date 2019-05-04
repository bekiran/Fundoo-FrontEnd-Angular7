import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http/http.service";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Output, EventEmitter } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { from } from "rxjs";

@Component({
  selector: "app-take-note",
  templateUrl: "./take-note.component.html",
  styleUrls: ["./take-note.component.scss"]
})
export class TakeNoteComponent implements OnInit {
  pinnedcard: any;
  bgcolor: any = "#FFFFFF";
  type = "note";
  flag = true;
  flag1 = true;
  noteTitle = new FormControl("", [Validators.required, Validators.required]);
  noteContent = new FormControl("", [Validators.required, Validators.required]);
  model: any;
  response: any;
  isPined = false;
  reminder = [];

  todaydate = new Date();
  tomorrow = new Date(
    this.todaydate.getFullYear(),
    this.todaydate.getMonth(),
    this.todaydate.getDate() + 1,
    0,
    0,
    0,
    0
  );

  constructor(
    private httpService: HttpService,
    private router: Router,
    private note: NoteServiceService
  ) { }

  ngOnInit() { }

  /**********************************************************************************
   * @output : to emit the event
   *********************************************************************************/

  @Output() addingNote = new EventEmitter();
  /******************************************************************************
   * addNote() to send all the details into the server
   *****************************************************************************/
  addNote() {
    console.log(localStorage.getItem("token"), "tokennnn");
    this.flag = !this.flag;
    if (this.noteTitle || this.noteContent) {
      this.model = {
        userId: localStorage.getItem("userid"),
        title: this.noteTitle.value,
        description: this.noteContent.value,
        reminder: this.reminder,
        pinned: this.isPined,
        archive: this.archive,
        color: this.bgcolor,
        trash: false,
        image: ""
      };
      this.httpService.postJSON("createNote", this.model).subscribe(data => {
        console.log(data);
        this.addingNote.emit(data["message"]);
        this.noteTitle.reset();
        this.noteContent.reset();
        this.bgcolor = "#FFFFFF";
      }),
        err => {
          console.log(err);
        };
    }
  }

  /**********************************************************************
   *
   * @param:  to take reverse the flag
   ************************************************************************/
  reverseFlag() {
    this.flag = !this.flag;
  }
  /**********************************************************************
   *
   * @param:  to change color
   ************************************************************************/
  changeColor($event) {
    console.log("Entered parent");

    this.bgcolor = $event;
  }
  /************************************************************************
   * to reverse the flag
   *************************************************************************/
  pinned() {
    this.flag1 = !this.flag1;
  }

  dopin(set) {
    this.isPined = set;
  }
  getReminder($event) {
    if (this.reminder[0] != undefined) {
      this.reminder = [];
      this.reminder.push($event);
    } else {
      this.reminder.push($event);
    }
  }
  archive($event) {
    this.archive = $event;
    this.addNote();
  }
}
