import {Assignment} from "./assignment.model";

export interface Costs{
  costsId:number;
  distance:number;
  distanceAdded:number;
  numberTickAuto:number;
  rateAuto:number;
  rateBreakfast:number;
  rateLunchAndDiner:number;
  rateAccommodation:number;
  rateKilometer:number;
  rateTransport:number;
  numberDays:number;
  numberBreakfast:number;
  numberLunchAndDinner:number;
  numberAccommodation:number;
  kilometer:number;
  amount:number;
  description:string;
  paymentDate:Date;
  assignment:Assignment;

}
