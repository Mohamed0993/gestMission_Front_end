import {Service} from "./service.model";
import {Grade} from "./grade.model";

export interface Personal{
  id:number;
  personalMatricule:string;
  civilite:string
  personalName:string;
  personalFullName:string;
  fonction : string
  //PersonalClass personalClass;
  sex:number;
  personalDayOfBirth : any;
  personalContact: string;
  gradeDTO:Grade;
  director:boolean;
  serviceDTO:Service
}
