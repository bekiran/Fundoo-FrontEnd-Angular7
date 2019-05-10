import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { MatCardModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterial } from "./app.material.module";
import { NoteComponent } from './components/note/note.component';

import { TakeNoteComponent } from './components/take-note/take-note.component';
import { IconlistComponent } from './components/iconlist/iconlist.component';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { SearchPipe } from './pipe/search/search.pipe';
import { LabelPipe } from './pipe/label/label.pipe';
import { SearchComponent } from './components/search/search.component';
import { ImagecropperComponent } from './components/imagecropper/imagecropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LabelsComponent } from './components/labels/labels.component';
import { LabelseditComponent } from './components/labelsedit/labelsedit.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './shared/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
// import {AngularFireModule} from 'angularFire2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    NoteComponent,
    TakeNoteComponent,
    IconlistComponent,
    DisplaynoteComponent,
    UpdatenoteComponent,
    ArchiveComponent,
    TrashComponent,
    RemindersComponent,
    ReminderComponent,
    SearchPipe,
    LabelPipe,
    SearchComponent,
    ImagecropperComponent,
    LabelsComponent,
    LabelseditComponent,
    CollaboratorsComponent,



  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    AppMaterial,
    ImageCropperModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

    // GridModule
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
