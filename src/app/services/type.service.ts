import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MissionType} from "../model/type.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http:HttpClient) { }
  public searchType(keyword: string):Observable<Array<MissionType>>{
    return this.http.get<Array<MissionType>>(environment.backendHost+"/types/search?keyword="+keyword);
  }

  public saveType(missiontype:MissionType):Observable<Array<MissionType>>{
    return this.http.post<Array<MissionType>>(environment.backendHost+"/types",missiontype);
  }

  public deleteType(id:number){
    return this.http.delete(environment.backendHost+"/types/"+id);
  }

  public getType():Observable<Array<MissionType>>{
    return this.http.get<Array<MissionType>>(environment.backendHost+"/types")
  }
}
