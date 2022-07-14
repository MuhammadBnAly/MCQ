import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewExamComponent } from './doctor/new-exam/new-exam.component';
import { StudentsComponent } from './doctor/students/students.component';
import { SubjectsComponent } from './doctor/subjects/subjects.component';
import { ExamComponent } from './student/exam/exam.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button'; 
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
//import { MatrialModule } from './matrial.module';
//import {StepsModule} from 'primeng/steps';
//import {MenuItem} from 'primeng/api';
import {MatStepperModule} from '@angular/material/stepper'; 
import {FileUploadModule} from 'primeng/fileupload';
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NewExamComponent,
    StudentsComponent,
    SubjectsComponent,
    ExamComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule ,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ToastrModule.forRoot(),
    // StepsModule,
    // MenuItem,
    MatStepperModule,
    FileUploadModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports:[
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
