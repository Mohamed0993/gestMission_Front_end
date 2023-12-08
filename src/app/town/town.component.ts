import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TownService} from "../services/town.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Town} from "../model/town.model";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.css']
})
export class TownComponent implements OnInit {

  town! : Observable<Array<Town>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined
  newTownFormGroup! : FormGroup
  constructor(private townService: TownService,private fb : FormBuilder ) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchTown();
    this.newTownFormGroup=this.fb.group({
      townName : this.fb.control(null, [Validators.required,Validators.minLength(4)]),
      townDistance : this.fb.control(null),
      tauxAuto : this.fb.control(null,[Validators.required]),
      tauxCTM : this.fb.control(null,[Validators.required]),
      tauxTrain : this.fb.control(null,[Validators.required]),
      tauxAvion : this.fb.control(null,[Validators.required]),
      nombreTickAuto : this.fb.control(null)
    })

  }

  handleSearchTown() {
    let kw=this.searchFormGroup?.value.keyword;
    this.town=this.townService.searchTown(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleSaveTown() {
    let town:Town = this.newTownFormGroup.value;
    this.townService.saveTown(town).subscribe({
      next : data=>{
        alert("La ville a bien été enregistré !");
        this.newTownFormGroup.reset();

        this.handleSearchTown();
      },
      error : err => {
        console.log(err);
      }
    })

  }

  handleDeleteTown(t: Town) {
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.townService.deleteTown(t.townId).subscribe({
      next: (resp )=> {
        this.town=this.town.pipe(
          map(data=>{
            let index=data.indexOf(t);
            data.slice(index,1)
            return data;
          })
        )
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
