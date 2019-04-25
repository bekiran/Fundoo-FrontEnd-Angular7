import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { from } from 'rxjs';
import { NoteComponent } from './components/note/note.component';
import {UpdatenoteComponent} from "../app/components/updatenote/updatenote.component";
import {ArchiveComponent} from "../app/components/archive/archive.component";
import { TrashComponent } from '../app/components/trash/trash.component';
import { RemindersComponent } from '../app/components/reminders/reminders.component'
import { AuthguardService } from './service/authguard/authguard.service';
import {ReminderComponent} from '../app/components/reminder/reminder.component';
import { SearchComponent } from './components/search/search.component';
import { ImagecropperComponent } from './components/imagecropper/imagecropper.component';
import { LabelsComponent } from './components/labels/labels.component';
import { LabelseditComponent } from './components/labelsedit/labelsedit.component';

const routes: Routes = [
  {
    path : '',
    component: LoginComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'resetPassword/:token',
    component:ResetpasswordComponent 
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent 
  },
  {
    path:'dashboard',
    component:DashboardComponent,canActivate:[AuthguardService],
    children:[
      {
        path:'',
        redirectTo : 'note',
        pathMatch : 'full'
      },
      {
        path:'note',
        component:NoteComponent
      },
      {
        path :'trash',
        component : TrashComponent
      },
      {
        path : 'archive',
        component: ArchiveComponent
      },
      {
        path: 'reminders',
        component: RemindersComponent
      },
      {
        path: 'reminder',
        component: ReminderComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'labels',
        component: LabelsComponent

      }
    ]
  },
  {
    path: 'updatenote',
    component: UpdatenoteComponent
  },
  {
    path : 'imagecropper',
    component: ImagecropperComponent
  },
  {
    path : 'labelsedit',
    component : LabelseditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
