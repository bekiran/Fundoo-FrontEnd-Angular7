import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  email:any;
  username:string
  image:any
  img = localStorage.getItem('image')

  constructor() { 
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
    // this.image = localStorage.getItem('image')
  }

  ngOnInit() {
  }

}
