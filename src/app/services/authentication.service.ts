import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Personal} from "../model/personal.model";

const httpOptions ={
  headers: new HttpHeaders({ "Content-Type": "x-www-form-urlencoded", "method":"post" }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users : AppUser[]=[];
  authenticatedUser : Personal;

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private http:HttpClient,
              private authServ: AuthService) {

  }

  proceedLogin(UserCred:any){
    return this.http.post(environment.backendHost+"/authenticate",UserCred, {headers: this.requestHeader});
  }

  public getPrincipal():Personal{
    this.http.get<Personal>(environment.backendHost+"/assignments/principal").subscribe({
      next:data=>{
         this.authenticatedUser = data;

      },
      error:err => {
        console.log(err);
      }
    })
    return this.authenticatedUser;
  }


  public login(email:string, password:string):Observable<AppUser>{
    let appUser = this.users.find(u => u.email == email);
    if(!appUser) return throwError(()=>Error("User not found"));
    if(appUser.password!= password){
      return throwError(()=>Error("Bad credentials "));
    }
    return of(appUser);

  }




  // @ts-ignore
  public hasRole(allowedRoles) : boolean {

    let isMatch= false;
    const userRoles : any = this.authServ.getRoles();
    if(userRoles != null && userRoles){
      for(let  i = 0; i < userRoles.length; i++){
       for (let j=0; j < allowedRoles.length; j++){
         if (userRoles[i].type === allowedRoles[j]) {
           isMatch = true;
           return isMatch;
         } else {
           return isMatch;
         }
       }
      }
    }
  }

}
