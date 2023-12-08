import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../model/grade.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http:HttpClient) { }
  public searchGrade(keyword:string):Observable<Array<Grade>>{
    return this.http.get<Array<Grade>>(environment.backendHost+"/grades/search?keyword="+keyword)
  }


}
