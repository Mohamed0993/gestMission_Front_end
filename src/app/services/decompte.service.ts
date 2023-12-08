import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Assignment} from "../model/assignment.model";
import {Costs} from "../model/costs.model";

@Injectable({
  providedIn: 'root'
})
export class DecompteService {

  constructor(private http:HttpClient) { }

  public saveDecompte(decompte:Costs):Observable<Costs>{
    return this.http.post<Costs>(environment.backendHost+"/costs",decompte);
  }

  public getAllDecompte():Observable<Array<Costs>>{
    return this.http.get<Array<Costs>>(environment.backendHost+"/costs");
  }
  public getDecompte():Observable<Costs>{
    return this.http.get<Costs>(environment.backendHost+"/costs/cost");
  }
  public setDecompteWithAssign(assign:Assignment):Observable<Costs>{
    return this.http.put<Costs>(environment.backendHost+"/costs/assignment",assign);
  }
  public calculiTotal():Observable<Costs>{
    return this.http.get<Costs>(environment.backendHost+"/costs/calculi");
  }
  public printCost(fileName:string):Observable<HttpEvent<Blob>>{
   return  this.http.get(environment.backendHost+"/costs/download/"+fileName,{
     reportProgress: true,
     observe:'events',
     responseType:"blob"
   });
  }

  public printOrder(assignId:number):Observable<HttpEvent<Blob>> {

    return this.http.get(environment.backendHost+"/pdf/generate/"+assignId,{
      reportProgress: true,
      observe:'events',
      responseType:"blob"
    });
  }

}
