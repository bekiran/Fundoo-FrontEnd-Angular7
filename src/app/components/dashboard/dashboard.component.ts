/************************************************************************************************
 * Execution : 1. default node cmd> dashboard.component.ts
 *
 * Purpose :dashboard to fundoo Notes
 *
 * @file   : dashboard.component.ts
 * @module : dashboard.component.ts - This is optional if expeclictly its an npm or local package
 * @author : Kiran B.E. <bekiranabbi@gmail.com>
 * @since  : 07-03-2019
 *
 *************************************************************************************************/
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatDialog,} from "@angular/material";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  message: string="Fundoo";
  Search: string;
  labelList: any;
  email : any;
  username:string;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private notes: NoteServiceService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
  }

  ngOnInit() {
    this.islist = true;
    this.isClicked =false;
  }
  islist;
  isClicked;
  changeview(){
    // debugger
    if(this.islist){
      this.islist = false;
      console.log("list",this.islist);
      this.isClicked = true;
    }
    
    else{

        this.isClicked = false;
        console.log("grid",this.isClicked);
        this.islist =true;
    }
    this.notes.gridview();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isclick() {
    return false;
  }

  refresh(): void {
    window.location.reload();
}
  note() {
    this.message="Fundoo"
    this.router.navigate(['dashboard/note']);
  }
  reminders(){

    this.message="Reminders"
    this.router.navigate(['dashboard/reminders'])
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  archive(){
    this.message="Archive"
    this.router.navigate(['dashboard/archive']);
  }
  trashBox() {
    this.message="Trash"
    this.router.navigate(['dashboard/trash']);
  }
}
