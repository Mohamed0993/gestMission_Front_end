import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {MissionType} from "../model/type.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeService} from "../services/type.service";
import {ServiceService} from "../services/service.service";
import {Service} from "../model/service.model";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  types ! : Observable<Array<MissionType>>
  service ! : Observable<Array<Service>>
  errorMessage !: string
  searchFormGroup : FormGroup | undefined
  newTypeFormGroup !: FormGroup
  constructor(private typeService:TypeService, private fb: FormBuilder, private ServiceServ: ServiceService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.listService();
    this.handleSearchType();
    this.newTypeFormGroup = this.fb.group({
      label : this.fb.control(null,[Validators.required]),
      serviceDTO : this.fb.control(null)
    })
  }

  handleSearchType(){
    let kw = this.searchFormGroup?.value.keyword;
    this.types = this.typeService.searchType(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleSaveType(){
    let type:MissionType = this.newTypeFormGroup.value;
    this.typeService.saveType(type).subscribe({
      next : data=>{
        alert("Type has been, successfully saved!");
        this.newTypeFormGroup.reset();
        this.handleSearchType();
      },
      error : err => {
        console.log(err)
      }
    })
  }

  listService(){
    this.service = this.ServiceServ.listService().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteType(t: MissionType) {
    let conf = confirm("Are you sure?")
    if(!conf) return
    this.typeService.deleteType(t.id).subscribe({
      next:(resp)=>{
        this.types=this.types.pipe(
          map(data=>{
            let index = data.indexOf(t);
            data.slice(index,1)
            return data
          })
        )
      },
      error:err => {
        console.log(err);
      }

    })


  }

  handleUpdateType(t: MissionType) {

  }
}
