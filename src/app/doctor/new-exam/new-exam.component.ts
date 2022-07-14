import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  name = new FormControl("");
  subjectName : string = '';
  images : any[] = [];
  imageForm! : FormGroup;

  questionForm! : FormGroup;
  questions : any[] = [];
  correctNum : any;
  preview : boolean = false;
  startAdding : boolean = false;
  stepperIndex = 0;
  id : any;



  // firstFormGroup = this.formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isEditable = false;



  constructor(
    private formBuilder : FormBuilder,
    private toastr : ToastrService,
    private doctorService : DoctorService) { }

  ngOnInit(): void {
    this.createForm();
  }


  startExam(){
    if(this.name.value == ""){
      this.toastr.error('يرجى إدخال اسم المادة')
    }else{
      this.startAdding = true;
      this.subjectName = this.name.value;
      // this.image = this.image.value;
    }
    if(this.startAdding){
      this.stepperIndex = 1;
    }
  }

  createForm(){
    this.questionForm = this.formBuilder.group({
      question : ['', [Validators.required]],
      answer1 : ['', [Validators.required]],
      answer2 : ['', [Validators.required]],
      answer3 : ['', [Validators.required]],
      answer4 : ['', [Validators.required]]
    })

  }

  // 
  getCorrectAnswer(event : any){
    this.correctNum = event.value;
  }

  //
  submitAll(){
    const model = {
      images : this.images,
      name : this.subjectName,
      questions : this.questions
    }
    if(this.preview){
      this.stepperIndex = 2;
    }else{
      this.doctorService.createNewExam(model).subscribe( (result : any) => {
        this.preview = true;
        this.id = result.id;
      })
    }
  }
  //
  cancelAll(){
    this.images = [];
    this.name.reset();
    this.subjectName = '';
    this.questionForm.reset();
    this.questions = [];
    this.preview = false;
    this.startAdding = false;
    this.stepperIndex = 0;
  }
  //
  clearForm(){
    this.questionForm.reset();
  }
  //
  createQuestion(){
    if(this.correctNum){
      const model = {
        question : this.questionForm.value.question,
        answer1 : this.questionForm.value.answer1,
        answer2 : this.questionForm.value.answer2,
        answer3 : this.questionForm.value.answer3,
        answer4 : this.questionForm.value.answer4,
        correctAnswer : this.questionForm.value[this.correctNum]
      }
      this.questions.push(model);
      this.questionForm.reset();
    }else{
      this.toastr.error('قم بإختيار إجابة صحيحة')
    }
    console.log(this.questions);
    
  }

  deleteQuestion(index : number){
    this.questions.splice(index, 1);

    const model = {
      image : this.images,
      name : this.subjectName,
      questions : this.questions
    }

    confirm('سيتم حذف الإجابة')
    if (true){
      this.doctorService.updateExam(model, this.id).subscribe( (res : any) => {
        this.toastr.success('تم حذف السؤال بنجاح');
      })
    }
    
  }

  // editQuestion(index : number){

  // }

  onBasicUpload(event : any){
    if(this.images){
      const imagesModel = {
        images : this.imageForm.value.images
      }
    }
  }

}
