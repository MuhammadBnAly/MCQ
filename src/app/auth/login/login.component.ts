import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, take } from 'rxjs';
import { Students, User, Doctor, Student } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users : any[] = [];
  loginForm! : FormGroup;
  type : string = 'students';

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService) { }

    
  ngOnInit(): void {
    this.getUsers();
    this.CreateForm();
  }

  CreateForm(){
    this.loginForm = this.formBuilder.group({
      type : [this.type],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required  ]]
    })
  }

  getRole(event:any){
    this.type = event.value;
    this.getUsers();
  }


  getUsers(){
    this.authService.getUsers(this.type).subscribe((returnedDate : any) => {
      this.users = returnedDate;
    });
  }

  submit(){
    let index = this.users.findIndex(item =>
      item.email == this.loginForm.value.email &&
      item.password == this.loginForm.value.password);

      if( index == -1){
        this.toastr.error('الإيميل أو كلمة المرور غير صحيحة', '', {
          disableTimeOut : false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true,
        });
      }
      else {
        const model = {
          username : this.users[index].username,
          email : this.users[index].email,
          role : this.type,
          userId : this.users[index].id,
          loginTime : new Date(),
        }
        // this.authService.login(model).subscribe( res => {
        this.authService.AllLogins(model).subscribe( (res:any) => {
          // this.users = res
          this.authService.login(model).subscribe((res:any) => {this.users = res})
          this.authService.user.next(res);
          this.toastr.success('تم تسجيل الدخول بنجاح', '', {
            disableTimeOut : false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut:5000,
            closeButton: true,
          })
          this.router.navigate(['/subjects'])
        })
      }
  }

}
