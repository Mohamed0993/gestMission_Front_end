import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DecompteService} from "../services/decompte.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "../model/assignment.model";
import {Costs} from "../model/costs.model";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Worksite} from "../model/worksite.model";
import {Town} from "../model/town.model";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Personal} from "../model/personal.model";
import {AssignmentValideComponent} from "../assignment-valide/assignment-valide.component";
import {PersonalService} from "../services/personal.service";

@Component({
  selector: 'app-decompte',
  templateUrl: './decompte.component.html',
  styleUrls: ['./decompte.component.css']
})
export class DecompteComponent implements OnInit {

  newDecompteFormGroup !: FormGroup;
  town !: Town
  mission !: Assignment;
  amount: number = 0;
  errorMessage !: string;
  decompte!: Costs
  private filenames: string[]=[];
  private fileStatus= {status: '', requestType:'', percent:0};

  constructor(private decompteService: DecompteService, private fb: FormBuilder, private modalService: NgbModal, private valide : AssignmentValideComponent) {
  }

  @ViewChild('content') addview!:ElementRef

  ngOnInit(): void {

  }

 decompteFormGroup = this.fb.group({
    personalName: this.fb.control(''),
    personalMatricule: this.fb.control(''),
    assignmentId: this.fb.control(0),
    assignmentDate: this.fb.control(new Date()),
    // assignmentville: this.fb.control([]),
    assignementDateOfDeparture: this.fb.control(new Date()),
    assignmentDateReturn: this.fb.control(new Date()),
    movingMeans: this.fb.control(''),
    distance: this.fb.control(0),
    distanceAdded: this.fb.control(0),
    tauxKilo: this.fb.control(0),
    tauxAuto: this.fb.control(0),
    nbrePeage: this.fb.control(0),
    tauxDejetDin: this.fb.control(0),
    tauxPetiDej: this.fb.control(0),
    tauxHeberj: this.fb.control(0),
    nbreDej: this.fb.control(0),
    nbrePetitDej: this.fb.control(0),
    nbreHebergement: this.fb.control(0),
    amount:this.fb.control(0.0)

  });

  handleSaveDecompte() {



      this.decompteService.saveDecompte(this.decompte).subscribe({
        next:(cost)=>{

          alert("Decompte has been successfully saved!");
          let assignment: Assignment = cost.assignment;
          console.log(assignment);
          this.valide.valideAssignment(assignment);
          let fileName = assignment.assignmentId+".";
          console.log(fileName);
          this.onDownloadCost(cost.assignment.assignmentId+".xlsx");

        },
        error(err){
          console.log(err);
        }

      })

   }

   onDownloadCost(fileName:string){
    this.decompteService.printCost(fileName).subscribe(
      event=>{
        console.log(event);
        this.resportProgress(event);
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
     }
    );
   }

   calcul(){
    this.decompteService.calculiTotal().subscribe({
      next:(data)=>{
       this.amount = data.amount;
        this.decompte = data;
        this.decompteFormGroup.value.amount=this.decompte.amount;
        console.log(this.decompte);
        console.log(this.decompteFormGroup.value);
      },
      error(err){
        console.log(err);
      }
    });

   }



  setDecompte(assignmenValid: Assignment) {
    this.open();
    let personal = assignmenValid.personalDTO;
    let worksite:Array<Worksite> = assignmenValid.worksiteDTOS

    /*let objet:Town;

    for(let i = 0; i<worksite.length; i++){
      console.log(worksite[i].TownDTO);
      objet = worksite[i].TownDTO;

    }
    console.log(worksite);
    // @ts-ignore
    console.log(objet);*/


    this.decompteService.setDecompteWithAssign(assignmenValid).subscribe({

      next: (decompte) => {
        this.decompte = decompte;
        decompte.assignment.personalDTO = personal;
       // console.log(decompte.assignment);
        this.valide.valideAssignment(decompte.assignment);
        //console.log(this.decompte)

        this.decompteFormGroup.setValue({

          // @ts-ignore
          amount: this.decompte.amount,
          assignementDateOfDeparture: this.decompte.assignment.assignmentDateOfDeparture,
          assignmentDate: this.decompte.assignment.assignmentDate,
          assignmentDateReturn: this.decompte.assignment.assigmentReturnDate,
          assignmentId: this.decompte.assignment.assignmentId,
          // assignmentville: this.decompte.assignment.worksiteDTOS,
          distance: this.decompte.distance,
          distanceAdded: this.decompte.distanceAdded,
          movingMeans: this.decompte.assignment.movingMeans,
          nbreDej: this.decompte.numberBreakfast,
          nbreHebergement: this.decompte.numberAccommodation,
          nbrePeage: this.decompte.numberTickAuto,
          nbrePetitDej: this.decompte.numberLunchAndDinner,
         personalMatricule: personal.personalMatricule,
          tauxAuto: this.decompte.rateAuto,
          tauxDejetDin: this.decompte.rateLunchAndDiner,
          tauxHeberj: this.decompte.rateAccommodation,
          tauxKilo: this.decompte.rateKilometer,
          tauxPetiDej: this.decompte.rateBreakfast,
          personalName:personal.personalName+" "+ personal.personalFullName
            })

          console.log(this.decompteFormGroup)
      },
      error(err) {
        console.log(err);
      }
    });

  }



  open(){
    this.modalService.open(this.addview,{ariaLabelledBy:'modal-basic-title',modalDialogClass:'modal-xl'}).result.then((result) =>{

    },(reason)=>{}
    );
  }

  private getDismissReason(reason:any):string {
    if(reason === ModalDismissReasons.ESC ){
      return 'by pressing ESC';
    }else if(reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    }else {
      return 'with: ${reason}';
    }
  }

  private resportProgress(httpEvent: HttpEvent< string[] |Blob> ) {
    switch (httpEvent.type){
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent)
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename);
          }

        }else {
          //download logic
          saveAs(new File([httpEvent.body!],httpEvent.headers.get('File-Name')!,
          { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));

          /*saveAs(new Blob([httpEvent.body!],
              {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
               httpEvent.headers.get('File-Name')!);*/
        }
        break;
      default:
        console.log(httpEvent);
    }

  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status='progress';
    this.fileStatus.requestType=requestType;
    this.fileStatus.percent = Math.round(100* loaded/total!);
  }

  printLiqui(decompte: Costs) {

    console.log(decompte);

  }
}
