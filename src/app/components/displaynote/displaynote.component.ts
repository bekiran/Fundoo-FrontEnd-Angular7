import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { HttpService } from "../../service/http/http.service";
import { MatCardSmImage } from "@angular/material";
import { forEach } from "@angular/router/src/utils/collection";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{UpdatenoteComponent} from '../updatenote/updatenote.component'
import {NoteServiceService} from '../../service/noteService/note-service.service'
export interface DialogData {
  array: [];
  cardid: any;
  cond: any;
  flag:boolean;
}

export interface DialogData {
  model: any;
  array: [];
  cond: any;
  flag1:true;
  show:false;
}
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
  @Input() more:string;
  @Input() type;
  @Input() archived;
  @Input() card: [];

  @Output() color = new EventEmitter();
  @Output() emitPinnedCard = new EventEmitter();
  @Output() emitUnPinnedCard = new EventEmitter();
  @Output() dialogResult = new EventEmitter();
  @Output() emitMainNote = new EventEmitter();
  @Input() pin;
  flag1= true;
  // displaymode:boolean=true

  constructor(public http: HttpService,public dialog: MatDialog, private noteService: NoteServiceService) {}

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
  openDialog(){
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: '450px',
      height:'150px',
      data: {}
    });
  }

  restore(card){
    try{
    this.noteService.deleteNote({
      "trash":false,
      "noteID":[card._id]
  }).subscribe(data=>{
    console.log(data,"response when delete");
    let ind=this.cards.indexOf(card)
    this.cards.splice(ind,1);
    // this.cardRestore(card)
  },err=>console.log(err))
}catch(err){
  console.log(err)
}
  }
  deleteForever(array){
    this.noteService.deleteForever({
      "deleteNote":false,
      "noteID":[array._id]
    }).subscribe(data=>{
      console.log(data,"response when delete");
      let ind=this.cards.indexOf(array)
      this.cards.splice(ind,1);
      // this.cardRestore(card)
    },err=>console.log(err))
  }
  notePin() {
    this.flag1 = !this.flag1;
  }

  doPinned(card){
    console.log("dopinned")
    this.noteService.doPin({
      "pinned": true,
      "noteID": [card._id]
    }).subscribe(data=>{
      console.log(card.pinned=true,'carddd')
      this.emitPinnedCard.emit(card)
      console.log(data,"resp dopin")},err=>
      console.log(err)) 
  }
  doUnPinned(card){
  this.noteService.doPin({
    "pinned": false,
    "noteID": [card._id]
  }).subscribe(data=>{
    console.log(data,"unpin")
    console.log(card.pinned=false,'do unpin card')
    this.emitUnPinnedCard.emit(card)},err=>
    console.log(err))
   
}

}
