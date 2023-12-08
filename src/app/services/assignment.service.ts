import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assignment} from "../model/assignment.model";
import {environment} from "../../environments/environment";
import {Personal} from "../model/personal.model";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http : HttpClient) { }

  public getAssignment():Observable<Array<Assignment>>{
    return this.http.get<Array<Assignment>>(environment.backendHost+"/assignments")
  }
  public getAssign(id : number):Observable<Assignment>{
    return this.http.get<Assignment>(environment.backendHost+"/assignments/"+id)
  }
  public getAll():Observable<Array<Assignment>>{
    return this.http.get<Array<Assignment>>(environment.backendHost+"/assignmentsAll")
  }
  public getPers():Observable<Array<Assignment>>{
    return this.http.get<Array<Assignment>>(environment.backendHost+"/assignmentsPers")
  }
  public saveAssignment(assignment:Assignment):Observable<Array<Assignment>>{
    return this.http.post<Array<Assignment>>(environment.backendHost+"/assignments",assignment)
  }
  public getAssignmentForDg():Observable<Array<Assignment>>{
    return this.http.get<Array<Assignment>>(environment.backendHost+"/assignmentsDG");
  }
  public getAssignmentForChef():Observable<Array<Assignment>>{
    return this.http.get<Array<Assignment>>(environment.backendHost+"/assignmentsChef");
  }
  public validateAssignment(assignment:Assignment):Observable<Assignment>{
    return this.http.put<Assignment>(environment.backendHost+"/assignments/validate",assignment)
  }
  public validateAssignmentByuuid(uuid:string, secret:string):Observable<boolean>{
    return this.http.get<boolean>(environment.backendHost+"/assignments/validateByUuid"+uuid+"&"+secret)
  }
  public canceledAssignment(assignment:Assignment):Observable<Assignment>{
    return this.http.post<Assignment>(environment.backendHost+"/assignments/cancel",assignment)
  }
  public rejectAssignment(assignment:Assignment):Observable<Assignment>{
    return this.http.post<Assignment>(environment.backendHost+"/assignments/reject",assignment);
  }
  public rejectAssignmentByUuid(uuid:string,secret:string):Observable<boolean>{
    return this.http.get<boolean>(environment.backendHost+"/assignments/rejectByUuid"+uuid+"&"+secret);
  }
  public resendAssignment(assignment:Assignment):Observable<Assignment>{
    return this.http.post<Assignment>(environment.backendHost+"assignments/resend",assignment);
  }
  public getPrincipal():Observable<Personal>{
    return this.http.get<Personal>(environment.backendHost+"/assignment/principal");
  }
}
