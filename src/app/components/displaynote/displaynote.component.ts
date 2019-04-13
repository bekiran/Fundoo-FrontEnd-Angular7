import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { HttpService } from "../../service/http/http.service";
import { MatCardSmImage } from "@angular/material";
import { forEach } from "@angular/router/src/utils/collection";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UpdatenoteComponent } from "../updatenote/updatenote.component";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
export interface DialogData {
  array: [];
  cardid: any;
  cond: any;
  flag: boolean;
}

// export interface DialogData {
//   model: any;
//   array: [];
//   cond: any;
//   flag1: true;
//   show: false;
// }
@Component({
  selector: "app-displaynote",
  templateUrl: "./displaynote.component.html",
  styleUrls: ["./displaynote.component.scss"]
})
export class DisplaynoteComponent implements OnInit {
  /********************************
   *to get input from other components
   *********************************/
  @Input() childMessage: string;
  @Input() cards;
  @Input() more: string;
  @Input() type;
  @Input() archived;
  @Input() card: [];
  @Output() color = new EventEmitter();
  @Output() emitPinnedCard = new EventEmitter();
  @Output() emitUnPinnedCard = new EventEmitter();
  @Output() dialogResult = new EventEmitter();
  @Output() emitMainNote = new EventEmitter();
  @Input() pin;

  model
  flag1 = true;
  todaydate = new Date();
  tomorrow  = new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(),
  (this.todaydate.getDate() + 1), 0, 0, 0, 0);
  // displaymode:boolean=true

  constructor(
    public http: HttpService,
    public dialog: MatDialog,
    private noteService: NoteServiceService
  ) {}

  ngOnInit() {}

  colorsEdit(color) {
    console.log("Came to emmiter", color);
    this.color.emit(color);
  }

  archive(array) {
    let ind = this.cards.indexOf(array);
    this.cards.splice(ind, 1);
  }
  unarchived($event) {
    this.archive($event);
  }
  openDialog(array) {
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: "600px",
      // height: "130px",
      data: {array}
    });

    dialogRef.afterClosed().subscribe(result => {
    
      console.log(result['array'], 'from dialog box');
      
      this.emitMainNote.emit(result['array']);
      if(this.doPinned!=result['array'].isPined){
      this.dialogResult.emit(result['array']);
      }
      this.model = {
        noteID: result['array']._id,
        title: result['array'].title,
        description: result['array'].description,
      }
      console.log(this.model, "modelll of update")
      this.noteService.updatenote(
        this.model).subscribe(message => {
          console.log(message)
        })


        this.noteService.updatedescription(
          this.model).subscribe(Message => {
            console.log(Message);
            
          })
      });

  }

  restore(card) {
    try {
      this.noteService
        .deleteNote({
          trash: false,
          noteID: [card._id]
        })
        .subscribe(
          data => {
            console.log(data, "response when delete");
            let ind = this.cards.indexOf(card);
            this.cards.splice(ind, 1);
            // this.cardRestore(card)
          },
          err => console.log(err)
        );
    } catch (err) {
      console.log(err);
    }
  }
  deleteForever(array) {
    this.noteService
      .deleteForever({
        deleteNote: false,
        noteID: [array._id]
      })
      .subscribe(
        data => {
          console.log(data, "response when delete");
          let ind = this.cards.indexOf(array);
          this.cards.splice(ind, 1);
          // this.cardRestore(card)
        },
        err => console.log(err)
      );
  }
  notePin() {
    this.flag1 = !this.flag1;
  }

  doPinned(card) {
    console.log("dopinned");
    this.noteService
      .doPin({
        pinned: true,
        noteID: [card._id]
      })
      .subscribe(
        data => {
          console.log((card.pinned = true), "carddd");
          this.emitPinnedCard.emit(card);
          console.log(data, "resp dopin");
        },
        err => console.log(err)
      );
  }
  doUnPinned(card) {
    this.noteService
      .doPin({
        pinned: false,
        noteID: [card._id]
      })
      .subscribe(
        data => {
          console.log(data, "unpin");
          console.log((card.pinned = false), "do unpin card");
          this.emitUnPinnedCard.emit(card);
        },
        err => console.log(err)
      );
  }

  removeReminder(array) {
    console.log(array,"bgcdvzjh");

    var model= { "noteID": [array._id],
    "reminder":"" }
    console.log(model,"model")
  
      this.noteService.removeRemainder( model).subscribe(data => {
        console.log(data),
        array.reminder="";
        // let ind = this.cards.indexOf(array);
        // array.reminder.splice(ind, 1)
      })
   
  }
}
