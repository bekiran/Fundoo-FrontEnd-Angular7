import { Component, OnInit } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { DataserviceService } from "../../service/dataservice/dataservice.service"
import { from } from "rxjs";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: "app-labels",
  templateUrl: "./labels.component.html",
  styleUrls: ["./labels.component.scss"]
})
export class LabelsComponent implements OnInit {
  arrayCard: any[];
  layout = "row wrap";
  view;
  wrap = "wrap";
  direction;
  label:any

  constructor(private noteService: NoteServiceService , private dataService: DataserviceService) {}

  ngOnInit() {

    this.dataService.getLabel.subscribe(message =>{
      this.label=message;
       this.getNotes();
    })


    this.noteService.getView().subscribe((res: any) => {
      // debugger
      console.log(res);
      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    });
  }

  getNotes(){
    this.noteService.getNotesOfLabel(this.label.label).subscribe(data=>{
      this.arrayCard=data['data'];
      this.arrayCard=this.arrayCard.reverse();
      console.log(this.arrayCard,"card in editlabel")
    })
  }
}
