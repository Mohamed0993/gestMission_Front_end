import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of, throwError} from "rxjs";
import {Personal} from "../model/personal.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonalService} from "../services/personal.service";
import {Service} from "../model/service.model";
import {ServiceService} from "../services/service.service";
import {Grade} from "../model/grade.model";
import {GradeType} from "../model/enum/GradeType.enum";
import {Civilite} from "../model/enum/Civilite.enum";
import {Sex} from "../model/enum/Sex.enum";

const grades: Observable<Array<Grade>> = of([
  {id:1, type:GradeType.DG, label: "Directeur General"},
  {id:2 ,type:GradeType.DGA, label: "Directeur Adjoint"},
  {id:3 ,type:GradeType.CHEF, label: "CHEF DE SERVICE"},
  {id:4 ,type:GradeType.ASSISTANT, label: "Assistant(e)"},
  {id:5 ,type:GradeType.AUTRE, label: "AUTRE"},
  {id:6 ,type:GradeType.CHEFA, label: "CHEFA"},
  {id:7 ,type:GradeType.DAF, label: "Directeur Administratif et Financier"}
]);

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personal!:Observable<Array<Personal>>;
  service!:Observable<Array<Service>>;
  ser !: Observable<Service>

  errorMessage!: string;
  searchFormGroup : FormGroup|undefined
  newPersonalFormGroup !: FormGroup
  civiliteEnum = Civilite;
  gradeEnum = GradeType;
  grades !: Observable<Array<Grade>>;
  sexEnum = Sex;




  constructor(private personalService:PersonalService, private fb: FormBuilder, private ServiceServ: ServiceService ) {


  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.listService();

    this.grades = grades;
    this.handleSearchPersonal();
    this.newPersonalFormGroup = this.fb.group({
      civilite : this.fb.control(null),
      personalMatricule : this.fb.control(null,[Validators.required,Validators.minLength(6)]),
      personalName : this.fb.control(null,[Validators.required]),
      personalFullName: this.fb.control(null,[Validators.required]),
      fonction:this.fb.control(null,[Validators.required]),
      sex:this.fb.control(null),
      email: this.fb.control(null,[Validators.required]),
      //personalDayOfBirth : this.fb.control(new Date()),
      personalContact: this.fb.control(null,[Validators.required,Validators.minLength(8),Validators.maxLength(10)]),
      gradeDTO:this.fb.control(null),
      director:this.fb.control(false),
      serviceDTO:this.fb.control(null)
    })
    console.log(this.newPersonalFormGroup)
  }

  handleSearchPersonal(){
    let kw = this.searchFormGroup?.value.keyword;
    this.personal= this.personalService.searchPersonal(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    )
  }

  handleDeletePersonal(p: Personal) {
    this.personalService.deletePersonal(p.id);
  }

  handleSavePersonal() {

    let personal:Personal = this.newPersonalFormGroup.value;

    console.log(this.newPersonalFormGroup)
    this.personalService.savePersonal(personal).subscribe({
      next : data=>{
        alert("Personal has been successfully saved!");
        this.newPersonalFormGroup.reset();
        this.handleSearchPersonal();
      },
      error : err => {
        console.log(err)
      }
    })
  }
  listGrade(){


  }

  listService(){
    this.service = this.ServiceServ.listService().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  isDirector($event:any){
    const isChecked = $event.target.checked;
    console.log(isChecked);
  }

  findService(s:number):Observable<Service>{
    return this.ser = this.ServiceServ.findService(s).pipe(catchError(err => {
      this.errorMessage = err.message;
      return throwError(err);
    }))
  }
}
