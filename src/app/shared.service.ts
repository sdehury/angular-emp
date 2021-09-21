import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private saveURl='http://localhost:3000/api/addemp';
  private getURl='http://localhost:3000/api/getemp';
  private dltURl='http://localhost:3000/api/dltemp';
  private EditURL='http://localhost:3000/api/editemp';
  constructor(private http:HttpClient) { }
  getemp(){
    return this.http.get<any>(this.getURl)
  }
  saveEmp(emp:any){
    return this.http.post<any>(this.saveURl,emp)
  }
  editemp(data:any){
    return this.http.put<any>(this.EditURL,data);
  }
  delemp(id:any){
    console.log(id);
     return this.http.delete<any>(`http://localhost:3000/api/deleteemp/`+id)
  }
}
