import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personal} from "../model/personal.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http:HttpClient) { }

  public savePersonal(personal:Personal):Observable<Array<Personal>>{
    return this.http.post<Array<Personal>>(environment.backendHost+"/personals",personal)
  }

  public getPersonal():Observable<Array<Personal>>{
    return this.http.get<Array<Personal>>(environment.backendHost+"/personals")
  }
  public searchPersonal(keyword:string):Observable<Array<Personal>>{
    return this.http.get<Array<Personal>>(environment.backendHost+"/personals/search?keyword="+keyword)
  }

  public deletePersonal(id:number){
    this.http.delete(environment.backendHost+"/personals/"+id)
  }
  public getPersonalByMatricule(matricule:string):Observable<Personal>{
    return this.http.get<Personal>(environment.backendHost+"/personals/"+matricule)
  }


}
