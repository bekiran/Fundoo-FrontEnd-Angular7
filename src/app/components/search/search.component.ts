import { Component, OnInit } from "@angular/core";
import { NoteServiceService } from "../../service/noteService/note-service.service";
import { DataserviceService } from "../../service/dataservice/dataservice.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { from } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  arrayCard: any[];
  Search: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  layout = "row wrap";
  view;
  wrap = "wrap";
  direction;
  flag = false;

  constructor(
    public noteService: NoteServiceService,
    private data: DataserviceService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.Search = message;
    });
    this.getNotes();

    this.noteService.getView().subscribe((res: any) => {
      // debugger
      console.log(res);
      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    });
  }
  getNotes() {
    try {
      this.noteService
        .getNote()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            console.log("data in search ===>", data);

            var data1 = data["data"];
            this.arrayCard = [];
            for (var i = data1.length - 1; i >= 0; i--) {
              this.arrayCard.push(data1[i]);
            }
            console.log("array of cards in search===> ", this.arrayCard);
          },
          error => {
            console.log(error);
          }
        );
    } catch (err) {
      console.log(err);
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
