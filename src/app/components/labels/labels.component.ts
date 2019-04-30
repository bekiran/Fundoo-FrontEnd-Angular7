import { Component, OnInit } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { from } from "rxjs";

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

  constructor(private noteService: NoteServiceService) {}

  ngOnInit() {
    this.noteService.getView().subscribe((res: any) => {
      // debugger
      console.log(res);
      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    });
  }
}
