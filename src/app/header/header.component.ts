import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Personal} from "../model/personal.model";
import {Assignment} from "../model/assignment.model";
import {AssignmentService} from "../services/assignment.service";
import {AssignmentValideComponent} from "../assignment-valide/assignment-valide.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userConnecte :Personal;
  assign !: Array<Assignment>;
  constructor(public authService : AuthenticationService,
              private router : Router,
              private authServ : AuthService,

               ) { }

  ngOnInit(): void {
   this.authService.getPrincipal();


  }

  myImage:string= "/assets/img/sali.jpeg";
  myImage1:string= "/assets/img/gnaore.jpg";
  myImage2:string= "/assets/img/silue.jpg";
  myImage3:string= "/assets/img/maffa.jpeg";
  userConnected:string="/assets/img/maffa.jpeg"



  handleLogout() {
    this.authServ.clear();
    this.router.navigate(['']);

  }

  getName(){
    let personal = this.authService.authenticatedUser;
    return personal.personalName +" "+ personal.personalFullName;
  }

  getNot(){
    let not:number =0 ;



  }
}
