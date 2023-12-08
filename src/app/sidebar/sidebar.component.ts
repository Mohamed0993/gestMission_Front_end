import { Component, OnInit } from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import{faAngleDown} from '@fortawesome/free-solid-svg-icons'
import{faLaughWink} from '@fortawesome/free-solid-svg-icons'
import {AuthenticationService} from "../services/authentication.service";
import {AuthService} from "../services/auth.service";
import {GradeType} from "../model/enum/GradeType.enum";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faAngleRight=faAngleRight;
  faAngleDown=faAngleDown;
  faLaughWink=faLaughWink;

  constructor(public authService : AuthenticationService,
              private authServ: AuthService) { }

  ngOnInit(): void {
  }

  public isOther():boolean{
    return this.authService.authenticatedUser.gradeDTO.type == GradeType.AUTRE;
  }

}
