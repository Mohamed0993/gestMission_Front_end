import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Worksite} from "../model/worksite.model";

@Injectable({
  providedIn: 'root'
})
export class WorksiteService {

  constructor(private http:HttpClient) { }
  public getWorksite():Observable<Array<Worksite>>{
    return this.http.get<Array<Worksite>>(environment.backendHost+"/worksites")
  }

  public worksite(id : number):Observable<Worksite>{
    return this.http.get<Worksite>(environment.backendHost+"/worksites/"+id)
  }
  public saveWorksite(worksite: Worksite):Observable<Array<Worksite>>{

    return this.http.post<Array<Worksite>>(environment.backendHost+"/worksites",worksite);
  }

  public deleteWorksite(id: number){
    return this.http.delete(environment.backendHost+"/worksites/"+id)
  }

  public searchWorksite(keyword : string):Observable<Array<Worksite>>{
    return this.http.get<Array<Worksite>>(environment.backendHost+"/worksites/search?keyword="+keyword)
  }
}
