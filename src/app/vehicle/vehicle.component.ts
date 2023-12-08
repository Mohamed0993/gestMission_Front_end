import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Vehicle} from "../model/vehicle.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../services/vehicle.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicle! : Observable<Array<Vehicle>>
  errorMessage!:string
  searchFormGroup : FormGroup | undefined
  newVehicleFormGroup!: FormGroup

  constructor(private vehicleService : VehicleService, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchVehicle();
    this.newVehicleFormGroup = this.fb.group({
      vehicleRegistration : this.fb.control(null, [Validators.required]),
      vehicleMark:this.fb.control(null, [Validators.required]),
      vehicleModel:this.fb.control(null, [Validators.required]),
      vehiclePlace:this.fb.control(null, [Validators.required]),
    })

  }

  handleListService(){

  }

  handleSearchVehicle() {
    let kw = this.searchFormGroup?.value.keyword;
    this.vehicle = this.vehicleService.searchVehicle(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteVehicle(v: Vehicle) {
    let conf= confirm("Are you sure?")
    if(!conf) return;
    this.vehicleService.deleteVehicle(v.vehicleId).subscribe({
      next:(resp)=>{
        this.vehicle = this.vehicle.pipe(
          map(data=>{
            let index = data.indexOf(v);
            data.slice(index,1)
            return data
          })
        )
      }
    })
  }

  handleUpdateVehicle(v: Vehicle) {

  }

  handleSaveVehicle() {
  let vehicle:Vehicle = this.newVehicleFormGroup.value;
  console.log(vehicle);
  this.vehicleService.saveVehicle(vehicle).subscribe({
    next:data=>{
      alert("le véhicule a été enregistré avec succés!");
      this.newVehicleFormGroup.reset();
      this.handleSearchVehicle();
    },
    error: err => {
      console.log(err);
    }
  })
  }
}
