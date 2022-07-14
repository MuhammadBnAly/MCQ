import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id : any;
  subject : any;
  user : any;

  studentData : any;
  total:number = 0;
  showResult:boolean = false;
  usersubjects:any[] = [];
  validExam : boolean = true;

  constructor(
    private doctorService : DoctorService,
    private route : ActivatedRoute,
    private authService : AuthService,
    private toastr : ToastrService
  ) {
      this.id = route.snapshot.paramMap.get('id');
      this.getSubject();
      this.getLoggedInUser();
   }

  ngOnInit(): void {
  }

  getSubject(){
    this.doctorService.getSubject(this.id).subscribe ( res => {
      this.subject = res;
    })
  }

  getLoggedInUser(){
    this.authService.getRole().subscribe ( res => {
      this.user = res;
      this.getUserDate();
    })
  }

  getUserDate(){
    this.authService.getStudent(this.user.userId).subscribe( (res : any) => {
    this.studentData = res;
    this.usersubjects = res?.subjects ? res?.subjects : [];
    this.checkValidExam();
    })
  }

  checkValidExam(){
    for(let x in this.usersubjects){
      if(this.usersubjects[x].subjectId == this.id){
        this.validExam = false;
        this.toastr.warning('لقد أنجزت هذا الإختبار مسبقاً');
      }
    }
    console.log(this.validExam);
  }

  getAnswer(event : any){
    // let value = event.value,
    // questionIndex = event.source.name;
    // this.subject.questions[questionIndex].studentAnswer = value;
    
    this.subject.questions[event.source.name].studentAnswer = event.value;
    console.log(this.subject.questions);
  }
  getResult(){
    this.total=0;
    for(let i in this.subject.questions){
      if(this.subject.questions[i].studentAnswer == this.subject.questions[i].correctAnswer){
        this.total++;
      }
    }
    this.showResult = true;
    //
    this.usersubjects.push({
      subjectName : this.subject.name,
      subjectId : this.id,
      degree : this.total
    })
    //
    // model has both old and new data
    const model = {
      username : this.studentData.username,
      email : this.studentData.email,
      password : this.studentData.password,
      subjects : this.usersubjects
    }
    //
    if(this.user.role == 'students'){
      this.authService.updateStudent(this.user.userId, model).subscribe( (res:any) => {
        this.toastr.success('تم تسجيل النتجية بنجاح')
    })
  }
    console.log(this.total);
  }

  delete(index : number){
    this.subject.questions.splice(index, 1);
    const model = {
      name : this.subject.name,
      questions : this.subject.questions
    }
    this.doctorService.updateExam(model, this.id).subscribe(res => {
      this.toastr.success('تم حذف السؤال بنجاح');
    })
  }

}
