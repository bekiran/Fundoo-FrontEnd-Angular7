import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { DialogData } from "../displaynote/displaynote.component"
import { from } from 'rxjs';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  flag1 = true
  show = false;
  flag: boolean = false;

  model
  todaydate = new Date();
  tomorrow = new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(),
    (this.todaydate.getDate() + 1), 0, 0, 0, 0);


  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public noteService: NoteServiceService,
    private snackBar: MatSnackBar, public dialog: MatDialog) {

    // console.log(this.flag=data['flag']);
  }

  ngOnInit() {
  }

  doPin(card) {
    this.noteService.doPin({
      "pinned": true,
      "noteID": [card._id]
    }).subscribe(data => {
      console.log(card.pinned = true, 'card pinned')
      console.log(data, "resp dopin")
    }, err =>
        console.log(err))

  }
  doUnPin(card) {
    this.noteService.doPin({
      "pinned": false,
      "noteID": [card._id]
    }).subscribe(data => {
      console.log(card.pinned = false, 'do unpin card')
    }, err =>
        console.log(err))
  }
  openSnackBar() {
    this.snackBar.open("Can't edit in Trash", "Ok", { duration: 5000 })
  }
}
