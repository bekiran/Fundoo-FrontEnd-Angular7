import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { UserService } from '../../service/userService/user.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from } from 'rxjs';


@Component({
  selector: 'app-imagecropper',
  templateUrl: './imagecropper.component.html',
  styleUrls: ['./imagecropper.component.scss']
})
export class ImagecropperComponent implements OnInit {
  imagecroped : any
  response : any

  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService : UserService) { }

  ngOnInit() {
  }

  imageCropped($event) {
    console.log("cropper==>",$event);
    
    this.imageCropped = $event.file;
  }

  close(){
    this.dialogRef.close()

  }
  submit(){
    var formData = new FormData();
    formData.append('image',this.imagecroped);
    this.userService.profilePic(formData).subscribe(data =>{
      this.dialogRef.close(data);
      this.response=data
      localStorage.setItem('image',this.response.profilePic)
    })
    
  }

}
