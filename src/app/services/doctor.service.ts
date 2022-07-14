import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl :string = 'http://localhost:3000/';

  constructor(private http : HttpClient) { }

  createNewExam(model : any){
    return this.http.post(`${this.baseUrl}subjects`, model)
  }

  updateExam(model : any, id : number) {
    return this.http.put(`${this.baseUrl}subjects/${id}`, model)
  }

  getAllExams(){
    return this.http.get(`${this.baseUrl}subjects`);
  }

  getSubject(id : number){
    return this.http.get(`${this.baseUrl}subjects/${id}`);
  }
  
  deleteExam(id : number){
    return this.http.delete(`${this.baseUrl}subjects/${id}`);
  }
  //
  getAllStudents(){
    return this.http.get(`${this.baseUrl}students`);
  }

}
