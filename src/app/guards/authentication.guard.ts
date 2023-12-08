import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authServ : AuthService,
              private router : Router,
              private userService:AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authServ.getToken() !== null){
        const role = route.data["roles"] as Array<string>;

        if(role){
          const match = this.userService.hasRole(role);
          console.log(match);

          if(match){
            return true
          }else {
            this.router.navigate(['admin/forbidden']);
            return false;
          }
        }
      }

      this.router.navigate(['/login']);
      return false;


  }



}
