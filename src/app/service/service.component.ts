import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../services/service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Service} from "../model/service.model";
import {Town} from "../model/town.model";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  service! : Observable<Array<Service>>
  searchFormGroup : FormGroup| undefined
  errorMessage! : string
  newServiceFormGroup !: FormGroup

  constructor(private serviceService: ServiceService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchService();
    this.newServiceFormGroup = this.fb.group({
      serviceName : this.fb.control(null,[Validators.required])
    })
  }

  handleSearchService() {
    let kw = this.searchFormGroup?.value.keyword;
    this.service = this.serviceService.searchService(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteService(s: Service) {
    let conf = confirm("Are you sure?");
    if(!conf) return;


  }

  handleUpdateService(s: Service) {

  }

  handleSaveService() {
    let serv:Service = this.newServiceFormGroup.value;
    this.serviceService.saveService(serv).subscribe({
      next:data=>{
        alert("Service has bee, successfully saved!");
        this.newServiceFormGroup.reset();
        this.handleSearchService();
      },
      error : err => {
        console.log();
      }
    })

  }
}
