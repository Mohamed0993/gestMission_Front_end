import {GradeType} from "./enum/GradeType.enum";

export interface Grade {
  id:number;
  type : GradeType
  label: string;
}
