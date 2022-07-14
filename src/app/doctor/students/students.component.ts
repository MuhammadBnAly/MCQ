import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit  {

  dataSource : any;
  dataTable : any;
  displayedColumns : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(private doctorService : DoctorService) {
    this.displayedColumns = ['position', 'name','userId', 'email', 'subject', 'degree'];
   }

  ngOnInit(): void {
    this.getAllStudents();
    // this.dataSource.paginator = this.paginator;
  }

  getAllStudents(){
    this.doctorService.getAllStudents().subscribe( (res:any) => {
      this.dataSource = res.map( (student : any) => {
        if(student?.subjects){
          return student?.subjects?.map( (subject : any) => {
            return{
              name : student.username,
              userId : student.id,
              email : student.email,
              subjectName : subject.subjectName,
              degree: subject.degree
            }
          })
        }
        else{
          return [{
            name : student.username,
            userId : student.id,
            email : student.email,
            subjectName : "-",
            degree: "-"
          }]
        }
        
      })

      console.log(this.dataSource);
      this.dataTable = [];

      this.dataSource.forEach((item:any) => {
        item.forEach((subItem:any) => {
          this.dataTable.push({
            studentName : subItem.name,
            studentId : subItem.userId,
            studentEmail : subItem.email,
            subjectName : subItem.subjectName,
            degree: subItem.degree
          })
        });
      });
    })
  }


}
