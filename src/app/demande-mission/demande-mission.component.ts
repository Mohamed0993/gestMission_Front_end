import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {catchError, Observable, throwError} from "rxjs";
import {Assignment} from "../model/assignment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Costs} from "../model/costs.model";
import {Personal} from "../model/personal.model";
import {Vehicle} from "../model/vehicle.model";
import {Worksite} from "../model/worksite.model";
import {MissionType} from "../model/type.model";
import {MovingMeansEnum} from "../model/enum/MovingMeans.enum";
import {AssignmentService} from "../services/assignment.service";
import {VehicleService} from "../services/vehicle.service";
import {PersonalService} from "../services/personal.service";
import {WorksiteService} from "../services/worksite.service";
import {TypeService} from "../services/type.service";
import {AuthenticationService} from "../services/authentication.service";
import {DecompteService} from "../services/decompte.service";
import {DecompteComponent} from "../decompte/decompte.component";
import {AssignmentStateEnum} from "../model/enum/AssignmentStateEnum.enum";
import {GradeType} from "../model/enum/GradeType.enum";

@Component({
  selector: 'app-demande-mission',
  templateUrl: './demande-mission.component.html',
  styleUrls: ['./demande-mission.component.css']
})
export class DemandeMissionComponent implements OnInit {

  model: NgbDateStruct;

  assignmentL !: Observable<Array<Assignment>>
  assignmenValid!: Assignment
  validAssignmentFormGroup !: FormGroup
  decompteFormGroup !: FormGroup
  decompte!:Costs;
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
  public cuurentState !: string;


  constructor(private assignment:AssignmentService, private fb : FormBuilder, private vehicle : VehicleService,
              private pers : PersonalService, private work : WorksiteService , private type : TypeService,
              public authServ:AuthenticationService, private decompteService : DecompteService) { }

  ngOnInit(): void {
    this.getDataWorksite()
    this.getDataPersonal()
    this.getDataVehicle()
    this.listType()
    this.authServ.getPrincipal();
    this.getAll();


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


  }
  @ViewChild(DecompteComponent) addview!: DecompteComponent;

  handleSaveAssignment(){
    let assignment = this.validAssignmentFormGroup.value;
    assignment.personalDTOS = this.selectPersonals;
    assignment.vehicleDTOS = this.selectVehicules;
    assignment.worksiteDTOS = this.selectWorksite;
    assignment.personalDTO = this.authServ.authenticatedUser;

    this.assignment.saveAssignment(assignment).subscribe({
      next : data=>{
        alert("this assignment has been succefully saved!")
        this.validAssignmentFormGroup.reset()

      },
      error : err => {
        console.log(err)
      }
    })

  }

  public getAll(){
    this.assignmentL = this.assignment.getPers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
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
        this.validAssignmentFormGroup.value.personalDTOS = this.selectPersonals;

      }
    })
  }

  onItemSelectVehicle(item :Vehicle | any){
    let registration = item.vehicleRegistration
    this.vehicle.vehicle(registration).subscribe({
      next: (veh)=>{
        this.selectVehicules.push(veh)
        this.validAssignmentFormGroup.value.vehicleDTOS = this.selectVehicules;

      }
    })
  }
  onItemSelectWorksite(item :Worksite | any){
    let idWorksite = item.worksiteId
    this.work.worksite(idWorksite).subscribe({
      next: (worksite)=>{
        this.selectWorksite.push(worksite);
        this.validAssignmentFormGroup.value.worksiteDTOS = this.selectWorksite
      }
    })

  }
  getPersonal(){
    this.pers.getPersonalByMatricule("1613").subscribe({
      next : (personal)=>{
        this.user = personal
      }
    })
  }

  handleValidAssign(a: Assignment) {

    this.assignment.getAssign(a.assignmentId).subscribe({
      next:(assignement)=>{
        this.assignmenValid = assignement;
        console.log(this.assignmenValid);
        this.validAssignmentFormGroup = this.fb.group({
          assignmentPattern : this.fb.control(this.assignmenValid.assignmentPattern,[Validators.required]),
          movingMeans : this.fb.control(this.assignmenValid.movingMeans,[Validators.required]),
          assignmentDate : this.fb.control(this.assignmenValid.assignmentDate,[Validators.required]),
          assignmentDateOfDeparture : this.fb.control(this.assignmenValid.assignmentDateOfDeparture,[Validators.required]),
          assigmentReturnDate : this.fb.control(this.assignmenValid.assigmentReturnDate,[Validators.required]),
          type : this.fb.control(this.assignmenValid.type.label,[Validators.required]),
          worksiteDTOS : this.fb.control(this.assignmenValid.worksiteDTOS,[Validators.required]),
          personalDTOS : this.fb.control(this.assignmenValid.personalDTOS,[Validators.required]),
          vehicleDTOS : this.fb.control(this.assignmenValid.vehicleDTOS,[Validators.required]),
          personalDTO : this.fb.control(this.assignmenValid.personalDTO,[Validators.required])

        });
      },
      error :(err)=>{
        console.log(err);
      }
    })


  }

  valideAssignment(assignmenValid: Assignment) {

    this.assignment.validateAssignment(assignmenValid).subscribe({
      next : data=>{
        alert("this assignment has been succefully saved!")
        this.validAssignmentFormGroup.reset();


      },
      error : err => {
        console.log(err)
      }
    })
  }

  isVdtpeOrRdtype(assign:Assignment):boolean{
    return (assign.currentState == AssignmentStateEnum.VDTYPE) || (assign.currentState == AssignmentStateEnum.RDTYPE);

  }
  isVdtype(assign:Assignment):boolean {
    return assign.currentState == AssignmentStateEnum.VDTYPE;
  }

  isDaf():boolean{
    let grade = this.authServ.authenticatedUser.gradeDTO.type
    return grade == GradeType.DAF;
  }
  isChefOrDgOrAdjoint():boolean{
    return ((this.authServ.authenticatedUser.gradeDTO.type == GradeType.CHEF)||(this.authServ.authenticatedUser.gradeDTO.type==GradeType.CHEFA)
      || (this.authServ.authenticatedUser.gradeDTO.type == GradeType.DG) || (this.authServ.authenticatedUser.gradeDTO.type == GradeType.DGA));
  }

  public isOther():boolean{
    return this.authServ.authenticatedUser.gradeDTO.type == GradeType.AUTRE;
  }


  printOrder() {

  }

  setDecompte(assignmenValid: Assignment) {
    this.addview.setDecompte(assignmenValid);

  }

  ngAfterViewInit(): void {
  }

  resendAssing(assignmenValid: Assignment) {
      this.assignment.resendAssignment(assignmenValid).subscribe({
        next: data =>{
          alert("Mission renvoyé")
        },
        error : err => {
          console.log(err);
        }
      })
  }

  isRCHEForRDG(assign:Assignment):boolean{
    return (assign.currentState == AssignmentStateEnum.RCHEF) || (assign.currentState == AssignmentStateEnum.RDG);

  }

  cancelAssign(assignmenValid: Assignment) {
    this.assignment.canceledAssignment(assignmenValid).subscribe({
      next : data=>{
        alert("Mission annulé");
      },
      error : err => {
        console.log(err);
      }
    })
  }

  getState(assign:Assignment){

    const indexOfState = Object.keys(AssignmentStateEnum).indexOf(assign.currentState);
    const valueOfIndex = Object.values(AssignmentStateEnum)[indexOfState];
    return valueOfIndex;
  }
}
