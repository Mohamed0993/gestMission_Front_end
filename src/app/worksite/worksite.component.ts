import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Worksite} from "../model/worksite.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorksiteService} from "../services/worksite.service";
import {TownService} from "../services/town.service";
import {Town} from "../model/town.model";

@Component({
  selector: 'app-worksite',
  templateUrl: './worksite.component.html',
  styleUrls: ['./worksite.component.css']
})
export class WorksiteComponent implements OnInit {

  worksite! : Observable<Array<Worksite>>
  towns!:Observable<Array<Town>>
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined
  newWorksiteFormGroup! : FormGroup

  constructor(private worksiteService: WorksiteService, private fb : FormBuilder, private townService: TownService) { }

  ngOnInit(): void {
    this.searchFormGroup= this.fb.group({
      keyword : this.fb.control("")
    });
    this.changeTown();
    this.handleSearchWorksite();
    this.newWorksiteFormGroup = this.fb.group({
      worksiteObject : this.fb.control(null,[Validators.required, Validators.minLength(7)]),
      worksiteDuration : this.fb.control(null,[Validators.required]),
      townDTO : this.fb.control(null)
    })
  }

  handleDeleteWorksite(w: Worksite) {
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.worksiteService.deleteWorksite(w.worksiteId).subscribe({
      next: (resp)=>{
        this.worksite=this.worksite.pipe(
          map(data=>{
            let index = data.indexOf(w);
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

  handleSaveWorksite() {
    let worksite:Worksite = this.newWorksiteFormGroup.value;

    console.log(worksite);
    this.worksiteService.saveWorksite(worksite).subscribe({
      next : data=>{
        alert("Worksite has been successfully saved!");
        this.newWorksiteFormGroup.reset();
        this.handleSearchWorksite();
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleSearchWorksite() {
    let kw=this.searchFormGroup?.value.keyword;
    this.worksite = this.worksiteService.searchWorksite(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  changeTown() {
    this.towns=this.townService.getTown().pipe(
     catchError(err => {
       this.errorMessage=err.message;
       return throwError(err);
     })
    );
  }

  handleUpdateWorksite(w: Worksite) {

  }
}
