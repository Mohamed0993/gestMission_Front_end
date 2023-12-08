import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;
  responseData:any;
  errorMessage : any;

  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private router : Router,
              private authServ:AuthService) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      matricule : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  proceedLogin(){
    if(this.userFormGroup.valid){
      this.authService.proceedLogin(this.userFormGroup.value).subscribe(
        (result:any)=>{
          if(result!=null){
            this.responseData=result;
            this.authServ.setRoles(this.responseData.personalDTO.personalProfileDTOS);
            this.authServ.setTokent(this.responseData.jwtToken);

            const role = this.responseData.personalDTO.personalProfileDTOS.length;

            let roleAdmin: string ="";
            console.log(this.authServ.getRoles())

            if(role >1){
              /*for (let role of this.authServ.getRoles()) {

                if(role ==='ADMIN')
                  roleAdmin = role.valueOf();
              }*/
              const roleAdmin = this.responseData.personalDTO.personalProfileDTOS[1].type;
              console.log(roleAdmin)
              if(roleAdmin === 'ADMIN'){
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/admin/assignments']);
              }
            } else {
              this.router.navigate(['/admin']);
            }

          }
        },
        (error)=>{
          console.log(error);
          this.errorMessage=error;
        }
      )
    }
  }
 }
