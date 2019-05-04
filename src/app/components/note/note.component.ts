import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http/http.service";
import { NoteServiceService } from "src/app/service/noteService/note-service.service";
@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  allcards = [];
  card = [];
  addnote: any;
  constructor(
    public http: HttpService,
    private noteService: NoteServiceService
  ) {}
  cards: any = [];
  wrap: string = "wrap";
  direction;
  view;
  flag = false;
  layout;
  unpinned = [];
  pin: "pin";
  unpin: "unpin";
  mainClass = {
    open: this.flag,
    close: !this.flag
  };
  // note='note'
  ngOnInit() {
    this.getCards();
    this.noteService.getView().subscribe((res: any) => {
      // debugger
      console.log("note====>", res);

      this.view = res;
      this.direction = this.view.data;
      this.layout = this.direction + " " + this.wrap;
    });
  }
  getCards() {
    this.http.getHttp("getNotes").subscribe(data => {
      console.log(
        "get cards data==>",
        data
      );
      console.log("data in notes=====>", data["data"]);
      // this.cards = data['data'];
      var data1 = data["data"];
      this.cards = [];
      this.allcards = [];
      for (let i = 0; i < data1.length; i++) {
        if (!data1[i].archive && !data1[i].trash && data1[i].pinned) {
          this.cards.push(data1[i]);
        } else if (!data1[i].archive && !data1[i].trash && !data1[i].pinned) {
          this.allcards.push(data1[i]);
        }
      }
      this.cards = this.cards.reverse();
      this.allcards = this.allcards.reverse();
      console.log("all card is ", this.cards);
    });
  }
  // getCards() {
  //   this.http.getHttp("getNotes").subscribe(data => {
  //     console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",data);
  //     console.log(data['data'],"ghghfghvfghfghghghdf");
  //     // this.cards = data['data'];
  //    var data1=data['data'];
  //    this.cards=[];
  //    this.allcards=[];
  //     for(let i=0;i<data1.length;i++){
  //       if(!data1[i].archive && !data1[i].trash && data1[i].pinned){
  //         this.cards.push(data1[i])
  //       }
  //       else if(!data1[i].archive && !data1[i].trash && !data1[i].pinned){
  //         this.allcards.push(data1[i])
  //       }
  //     }
  //     this.cards = this.cards.reverse();
  //     this.allcards=this.allcards.reverse();
  //     console.log('all card is ',this.cards);

  //   });
  // }
  recievemessage($event) {
    this.addnote = $event;
    console.log(this.addnote, "......addnote");
    // this.allcards.push(this.addnote);
    // this.ngOnInit();
    this.getCards();
  }
  getPinCard($event) {
    let ind = this.allcards.indexOf($event);
    this.allcards.splice(ind, 1);
    this.cards.splice(0, 0, $event);
  }
  getUnpinCard($event) {
    let ind = this.cards.indexOf($event);
    this.cards.splice(ind, 1);
    this.allcards.splice(0, 0, $event);
  }
  dialogResult($event) {
    console.log($event, "event in note");

    if ($event.pinned) {
      let ind = this.allcards.indexOf($event);
      this.allcards.splice(ind, 1);
      this.cards.splice(0, 0, $event);
    } else {
      let ind = this.cards.indexOf($event);
      this.cards.splice(ind, 1);
      this.allcards.unshift($event);
    }
  }
}
