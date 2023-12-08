import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppUser} from "../model/user.model";
import {Personal} from "../model/personal.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticatedUser : Personal | undefined;

  constructor() { }

  public setRoles(roles:string[]){
    localStorage.setItem("roles",JSON.stringify(roles))
  }

  public getUserConnected(){

  }

  isAdmin():Boolean {
    if(!this.getRoles())
      return false;
    return (this.getRoles().indexOf('ADMIN') >=0);
  }

  public getRoles(): string []{
    // @ts-ignore
    return JSON.parse(localStorage.getItem("roles"));
  }

  public setTokent(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken():string{
    // @ts-ignore
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }
}
