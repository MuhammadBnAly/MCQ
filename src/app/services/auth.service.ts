import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject();
  baseUrl :string = 'http://localhost:3000/';

  constructor(private http : HttpClient) { }

  // post
  CreateStudent(model : any){
    return this.http.post( `${this.baseUrl}students`, model)
  }
  CreateDoctor(model : any){
    return this.http.post( `${this.baseUrl}doctors`, model)
  }
  // login
  AllLogins(model:any) {
    return this.http.post(`${this.baseUrl}loginLogs` , model)
  }
  login(model:any) {
    return this.http.put(`${this.baseUrl}loginNow/1` , model)
  }

  // get
  getUsers(type : string ){
    // type ? type="students" : type="doctors" ;
    return this.http.get(`${this.baseUrl}${type}`);
  }

  getAllStudents(){
    return this.http.get(`${this.baseUrl}students`)
  }

  getAllDoctors(){
    return this.http.get(`${this.baseUrl}doctors`)
  }

  getStudent(id : number){
    return this.http.get(`${this.baseUrl}students/${id}`)
  }
  getDoctor(id : number){
    return this.http.get(`${this.baseUrl}doctors/${id}`)
  }
  //update
  updateStudent(id: number ,model:any){
    return this.http.put(`${this.baseUrl}students/${id}`, model)
  }
  updateDoctor(id: number ,model:any){
    return this.http.put(`${this.baseUrl}doctors/${id}`, model)
  }

  //role
  getRole(){
    return this.http.get(`${this.baseUrl}loginNow/1`);
  }

}
