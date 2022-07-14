import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjects:any[] = [];
  user:any = {};

  constructor(
    private doctorService : DoctorService, 
    private authService : AuthService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getUserInfo();
  }

  getAllSubjects(){
    this.doctorService.getAllExams().subscribe( (res:any) => {
      this.subjects = res;
    })
  }

  getUserInfo(){
    this.authService.getRole().subscribe( res => {
      this.user = res;
    })
  }

  delete(index : number){
    let id = this.subjects[index].id;
    this.subjects.slice(index, 1);
    this.doctorService.deleteExam(id).subscribe( (res:any) => {
      this.toastr.success("تم حذف المادة بنجاح");
    })
  }
}
