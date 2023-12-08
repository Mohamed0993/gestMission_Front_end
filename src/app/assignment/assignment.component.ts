import {Component, Input, OnInit, Output} from '@angular/core';
import {AssignmentService} from "../services/assignment.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Assignment} from "../model/assignment.model";
import {Personal} from "../model/personal.model";
import {Vehicle} from "../model/vehicle.model";
import {Worksite} from "../model/worksite.model";
import {VehicleService} from "../services/vehicle.service";
import {PersonalService} from "../services/personal.service";
import {WorksiteService} from "../services/worksite.service";
import {NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {NgbdDatepickerRangePopup} from "./datepicker-range-popup";
import {MovingMeansEnum} from "../model/enum/MovingMeans.enum";
import {MissionType} from "../model/type.model";
import {TypeService} from "../services/type.service";
import {AuthenticationService} from "../services/authentication.service";



@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styles:[],
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {


  model: NgbDateStruct;

  assignmentL !: Observable<Array<Assignment>>

  dateDepart !: Date;
  dateRetour !: Date;

  newAssignmentFormGroup !: FormGroup
  public formGroup :FormGroup;
  errorMessage !: string
  personal !: Observable<Array<Personal>>
  per !: Observable<Personal>
  veh !: Observable<Vehicle>
  user!:Personal
  vehicule !: Observable<Array<Vehicle>>
  worksite !: Observable<Array<Worksite>>
  missionType !:Observable<Array<MissionType>>
  searchAssignmentFormGroup : FormGroup | undefined
  dropdownListWorksite:Array<any> =[]
  dropdownListPersonal:Array<any> =[]
  dropdownListVehicule:Array<any> =[]
  dropdownSettingsVehicle ={}
  dropdownSettingsPersonal ={}
  dropdownSettingsWorksite ={}
  selectPersonals:Array<Personal> = []
  selectVehicules:Array<Vehicle> =[]
  selectWorksite:Array<Worksite> = []
  movingMeanEnum = MovingMeansEnum
  selectedMovingMeans : string =''
  public person='Personals';
  public loadContent: boolean = false;


  constructor(private assignment:AssignmentService, private fb : FormBuilder, private vehicle : VehicleService,
              private pers : PersonalService, private work : WorksiteService , private type : TypeService,public authServ:AuthenticationService) {



  }

  ngOnInit(): void {

    this.getDataWorksite()
    this.getDataPersonal()
    this.getDataVehicle()
    this.listType()
    this.authServ.getPrincipal();

    this.dropdownSettingsVehicle = {
      singleSelection: false,
       idField: 'vehicleRegistration',
      textField: 'vehicleModel',
      enableCheckAll : true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      data:Array<Vehicle>
    };
    this.dropdownSettingsPersonal = {
      singleSelection: false,
      idField: 'personalMatricule',
      textField: 'personalFullName',
      enableCheckAll : true,
      maxHeight:197,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingsWorksite = {
      singleSelection: false,
      idField: 'worksiteId',
      textField: 'worksiteObject',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      clearSearchFilter: true,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false
    };

    this.newAssignmentFormGroup = this.fb.group({
      assignmentPattern : this.fb.control(null,[Validators.required]),
      movingMeans : this.fb.control(null,[Validators.required]),
      assignmentDate : this.fb.control(new Date(),[Validators.required]),
      //assignmentDateOfDeparture : this.fb.control(this.dateDepart,[Validators.required]),
      //assigmentReturnDate : this.fb.control(this.dateRetour,[Validators.required]),
      type : this.fb.control(null,[Validators.required]),
      worksiteDTOS : this.fb.control(null,[Validators.required]),
      personalDTOS : this.fb.control(this.dropdownListPersonal,[Validators.required]),
      vehicleDTOS : this.fb.control(null,[Validators.required]),
      personalDTO : this.fb.control(this.authServ.authenticatedUser,[Validators.required])

    });

  }


  handleSaveAssignment(){
    let assignment = this.newAssignmentFormGroup.value;
    assignment.assignmentDateOfDeparture = this.dateDepart;
    assignment.assigmentReturnDate = this.dateRetour;
    assignment.personalDTOS = this.selectPersonals;
    assignment.vehicleDTOS = this.selectVehicules;
    assignment.worksiteDTOS = this.selectWorksite;
    assignment.personalDTO = this.authServ.authenticatedUser;
    console.log(assignment);

    this.assignment.saveAssignment(assignment).subscribe({
      next : data=>{
        alert("this assignment has been successfully saved!")
        this.newAssignmentFormGroup.reset()

      },
      error : err => {
        console.log(err)
      }
    })

  }

  getDataWorksite(): void {
    let tmp:Array<Worksite> = []
    this.work.getWorksite().subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push(data[i]);
        // { worksiteId:data[i].worksiteId , worksiteObject: data[i].worksiteObject, worksiteDuration:data[i].worksiteDuration,
        //   TownId:data[i].TownId}
      }
      this.dropdownListWorksite = tmp;
    });
  }
  getDataPersonal(): void {
    let tmp:Array<Personal> = []
    this.pers.getPersonal().subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push(data[i]);
      }
      this.dropdownListPersonal = tmp;
    });
  }
  getDataVehicle(): void {
    let tmp:Array<Vehicle> = []
    this.vehicle.getVehicle().subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push(data[i]);
      }
      this.dropdownListVehicule = tmp;
    });
  }

  selectChangeHandler(event : any){
    this.selectedMovingMeans = event.target.value
  }

  listType(){
    this.missionType = this.type.getType().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    )
  }

  onItemSelectPersonal(item :Personal| any){

    let matricule = item.personalMatricule;
    this.pers.getPersonalByMatricule(matricule).subscribe({
      next : (personal)=>{
        this.selectPersonals.push(personal);
        this.newAssignmentFormGroup.value.personalDTOS = this.selectPersonals;

      }
    })
  }

  onItemSelectVehicle(item :Vehicle | any){
    let registration = item.vehicleRegistration
    this.vehicle.vehicle(registration).subscribe({
      next: (veh)=>{
        this.selectVehicules.push(veh)
        this.newAssignmentFormGroup.value.vehicleDTOS = this.selectVehicules;

      }
    })
  }
  onItemSelectWorksite(item :Worksite | any){
    let idWorksite = item.worksiteId
    this.work.worksite(idWorksite).subscribe({
      next: (worksite)=>{
        this.selectWorksite.push(worksite);
        this.newAssignmentFormGroup.value.worksiteDTOS = this.selectWorksite
      }
    })
    console.log(item)
  }
  getPersonal(){
   /*  this.authServ.getPrincipal().subscribe({
      next : (personal)=>{
        this.user = personal
      }
    })*/
  }


  receivingDateDep($event: NgbDate):void {

    this.dateDepart = new Date($event.year, $event.month, $event.day) ;
    console.log(this.dateDepart);
  }
  receivingDateRet($event: NgbDate):void {

    this.dateRetour = new Date($event.year, $event.month, $event.day);
    console.log(this.dateRetour);
  }
}
