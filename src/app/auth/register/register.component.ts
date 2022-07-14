import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm !: FormGroup
  users : any [] = [];

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getStudetns();
  }

  createRegisterForm(){
    this.userForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required  ]],
      confirmPassword : ['', Validators.required]
    })
  }

  // اعمل check على ال emails الموجوده .. عشان ميككرهاش
  getStudetns(){
    this.authService.getAllStudents().subscribe( (res : any) => {
      this.users = res;
    })
  }
  //
  submit(){
    const model = {
      username : this.userForm.value.username,
      email : this.userForm.value.email,
      password : this.userForm.value.password,
    }
    //check if it is exist
    let index = this.users.findIndex(item => item.email == this.userForm.value.email)
    
    if(index !== -1){
      this.toastr.error('البريد الإلكترونى موجود مسبقاً', "", {
        disableTimeOut : false,
        titleClass : "toastr_title",
        messageClass : "toastr_message",
        timeOut : 5000,
        closeButton : true
      })
    }else{
    this.authService.CreateStudent(model).subscribe ( (res:any) => {
      this.toastr.success('تم إنشاء الحساب بنجاح', "", {
        disableTimeOut : false,
        titleClass : "toastr_title",
        messageClass : "toastr_message",
        timeOut : 5000,
        closeButton : true
      })

      //
      const model = {
        username : res.username,
        email : res.email,
        role : 'students',
        userId : res.id,
        RegisterTime : new Date(),
      }
      // this.authService.login(model).subscribe( res => {
      this.authService.AllLogins(model).subscribe( (res:any) => {
        // this.users = res
        this.authService.login(model).subscribe((res:any) => {this.users = res})
        this.authService.user.next(res);
      })

      this.router.navigate(['/subjects'])
    })
  }
  }



}
