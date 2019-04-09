import { Component, OnInit, Output, Input } from '@angular/core'; 
import {NoteServiceService} from "../../service/noteService/note-service.service"
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss']
})
export class IconlistComponent implements OnInit {

  @Input() card: any;
  @Input() more;
  @Output() color = new EventEmitter();
  @Input() type;
  @Input() doarchive:boolean;
  @Output() deletecard = new EventEmitter();
  @Output() archivedCard = new EventEmitter();
  @Output() unarchiveCard = new EventEmitter();
  

  model: any;
  flag = false;
  flag2 = true;
  flag3 = true;
  flag4 = true;
  display=false;
  allcards:any;
  

  /***************************************************************
   * List of colors that can be applied to card taken in an array
   **************************************************************/
  colorArray = [
  [
  { 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E57373', 'name': 'Red' },
  { 'color': '#FF9100', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [
  { 'color': '#CCFF90', 'name': 'Green' },
  { 'color': '#84FFFF', 'name': 'Teal' },
  { 'color': '#B3E5FC', 'name': 'Blue' },
  { 'color': '#82B1FF', 'name': 'Darkblue' }],

  [
  { 'color': '#B388FF', 'name': 'Purple' },
  { 'color': '#E1BEE7', 'name': 'Pink' },
  { 'color': '#A1887F', 'name': 'Brown' },
  { 'color': '#F5F5F5', 'name': 'Gray' }
  ]
]

  constructor(private notes:NoteServiceService) { }

  ngOnInit() {
  }
  
  colorsEdit(color,card) {
    console.log(card,"cardd..............")
    console.log(color,"color........")
    if(card==undefined){
      this.color.emit(color);
    }
    else{
      card.color=color
      this.updateColor(color,card)
 
    }
  }

  updateColor(color,card) {
    console.log(card,"card..")
    console.log(card.color=color,'color..')
    this.notes.updateColor({
      "color": color,
      'noteID': [card._id]
    }).subscribe(data =>{
      console.log(data, "update color data")},
      err=>{
        console.log(err,"err")

      })
  }


// to move notes from note to archive
    doArchive(card){
      console.log(this.card,"cardddd")
      console.log(card._id,"cardidddddddddd")
      this.notes.archiveNote({
        "archive":true,
        "noteID":[card._id]
      }).subscribe(data=>{
        console.log(data,"dataaaaaaaaaaaaaaaaaaaaa")
        this.cardArchive(card)
      }),err=>console.log(err)
  }

    cardArchive(card){
      this.archivedCard.emit(card)
    }

    doUnArchive(card){
      this.notes.archiveNote({
        "archive":false,
        "noteID":[card._id]
      }).subscribe(data=>{
        this.notArchive(card)
      }),err=>console.log(err)
    }
    notArchive(card){
      this.unarchiveCard.emit(card)
    }

   
    deleteNote(card){
      this.notes.deleteNote({
          "trash":true,
          "noteID":[card._id]
      }).subscribe(data=>{
        console.log(data,"response ==> delete is clicked");
        this.cardDelete(card)
      },err=>console.log(err))
      
    }
    cardDelete(card){
      this.deletecard.emit(card)
    }

    reverseFlag(){
      this.flag2=!this.flag2
    }
}
