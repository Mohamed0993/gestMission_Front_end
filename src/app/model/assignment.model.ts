import {AssignmentStateEnum} from "./enum/AssignmentStateEnum.enum";
import {AssignmentStatusEnum} from "./enum/AssignmentStatus.enum";
import {Personal} from "./personal.model";
import {Worksite} from "./worksite.model";
import {AssignmentStates} from "./AssignmentStates.model";
import {Observable} from "rxjs";
import {MovingMeansEnum} from "./enum/MovingMeans.enum";
import {Vehicle} from "./vehicle.model";
import {MissionType} from "./type.model";
import {Costs} from "./costs.model";

export interface Assignment{
  assignmentId:number,
  assignmentPattern:string,
  type : MissionType,
 movingMeans: MovingMeansEnum,
  assignmentDate : Date,
  assignmentDateOfDeparture : Date,
  assigmentReturnDate : Date,
  assignmentStatus: AssignmentStatusEnum,
  assignmentStates :Array<AssignmentStates>,
  currentState : AssignmentStateEnum,
  nextState: AssignmentStateEnum,
  worksiteDTOS:Array<Worksite>,
  personalDTO : Personal,
  personalDTOS : Array<Personal>,
  vehicleDTOS : Array<Vehicle>,
  costs:Costs;
}
