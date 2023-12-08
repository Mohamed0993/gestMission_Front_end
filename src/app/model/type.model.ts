import {Service} from "./service.model";

export interface MissionType {
  id : number;
  label : string;
  serviceDTO : Service;
}
