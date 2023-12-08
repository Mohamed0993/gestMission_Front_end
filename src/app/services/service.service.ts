import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service} from "../model/service.model";
import {environment} from "../../environments/environment";
import {Town} from "../model/town.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {}

  public searchService(keyword:string):Observable<Array<Service>>{
    return this.http.get<Array<Service>>(environment.backendHost+"/services/search?keyword="+ keyword)
  }
  public saveService(service:Service):Observable<Array<Service>>{
    return this.http.post<Array<Service>>(environment.backendHost+"/services",service)
  }

  listService():Observable<Array<Service>> {
    return this.http.get<Array<Service>>(environment.backendHost+"/services");
  }

  public findService(id:number):Observable<Service>{
    return this.http.get<Service>(environment.backendHost+"/services/"+id)
  }
}
