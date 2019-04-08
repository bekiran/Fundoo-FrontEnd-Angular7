import { Component, OnInit,Inject  } from '@angular/core';
import { NoteServiceService } from "../../service/noteService/note-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  flag1=true
  show=false;
  constructor(public noteService : NoteServiceService, public dialog: MatDialog) { }

  ngOnInit() {
  }
}
