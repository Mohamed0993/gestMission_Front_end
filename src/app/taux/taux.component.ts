import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TauxService} from "../services/taux.service";
import {Personal} from "../model/personal.model";
import {Observable} from "rxjs";
import {Taux} from "../model/taux.model";

@Component({
  selector: 'app-taux',
  templateUrl: './taux.component.html',
  styleUrls: ['./taux.component.css']
})
export class TauxComponent implements OnInit {

  newTauxGroup !: FormGroup;
  errorMessage!: string;
  taux !: Observable<Taux>

  constructor(private tauxServ : TauxService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.newTauxGroup = this.fb.group({
      rateDejounerDiner : this.fb.control(null,[Validators.required]),
      ratePetitDejouner : this.fb.control(null,[Validators.required]),
      rateHebergement : this.fb.control(null,[Validators.required]),
      rateKilometrique : this.fb.control(null,[Validators.required]),
      rateDejounerDinerDirec : this.fb.control(null,[Validators.required]),
      ratePetitDejounerDirec : this.fb.control(null,[Validators.required]),
      rateHebergementDirec : this.fb.control(null,[Validators.required]),
      rateKilometriqueDirec : this.fb.control(null,[Validators.required]),
      rateTaxi : this.fb.control(null,[Validators.required]),
    })
  }

  handleSaveTaux() {

    let taux:Taux = this.newTauxGroup.value;

    console.log(this.newTauxGroup)
    this.tauxServ.saveTaux(taux).subscribe({
      next : data=>{
        alert("Taux has been successfully saved!");
        this.newTauxGroup.reset();

      },
      error : err => {
        console.log(err)
      }
    })
  }

}
