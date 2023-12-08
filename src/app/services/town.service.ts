import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Town} from "../model/town.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http:HttpClient) { }

  public getTown():Observable<Array<Town>>{
    return this.http.get<Array<Town>>(environment.backendHost+"/towns")
  }

  public searchTown(keyword : string):Observable<Array<Town>>{
    return this.http.get<Array<Town>>(environment.backendHost+"/towns/search?keyword="+keyword)
  }

  public saveTown(town : Town):Observable<Town>{
    return this.http.post<Town>(environment.backendHost+"/towns/",town)
  }

  public deleteTown(id : number){
    return this.http.delete(environment.backendHost+"/towns/"+id)
  }
}
