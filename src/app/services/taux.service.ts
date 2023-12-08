import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Taux} from "../model/taux.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TauxService {

  constructor(private http:HttpClient) { }

  public saveTaux(taux:Taux):Observable<Array<Taux>>{
    return this.http.post<Array<Taux>>(environment.backendHost+"/taux",taux);
  }
  public getTaux():Observable<Array<Taux>>{
    return this.http.get<Array<Taux>>(environment.backendHost+"/taux");
  }


}
