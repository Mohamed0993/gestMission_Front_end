import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../model/vehicle.model";
import {environment} from "../../environments/environment";
import {Service} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }
  public getVehicle() : Observable<Array<Vehicle>>{
    return this.http.get<Array<Vehicle>>(environment.backendHost+"/vehicles");
  }
  public vehicle(vehicleRegistration : string):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.backendHost+"/vehicles/"+vehicleRegistration)
  }
  public searchVehicle(keyword: String):Observable<Array<Vehicle>>{
    return this.http.get<Array<Vehicle>>(environment.backendHost+"/vehicles/search?keyword="+keyword)
  }
  public saveVehicle(vehicle:Vehicle):Observable<Array<Vehicle>>{
    return this.http.post<Array<Vehicle>>(environment.backendHost+"/vehicles",vehicle);
  }
  public deleteVehicle(id : number){
    return this.http.delete(environment.backendHost+"/vehicles/"+id);
  }
  public updateVehicle(id:number, vehicle:Vehicle):Observable<Array<Vehicle>>{
    return this.http.put<Array<Vehicle>>(environment.backendHost+"/vehicles/"+id,vehicle)
  }


}
