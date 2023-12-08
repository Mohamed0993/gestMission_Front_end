import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalComponent} from "./personal/personal.component";
import {TownComponent} from "./town/town.component";
import {WorksiteComponent} from "./worksite/worksite.component";
import {VehicleComponent} from "./vehicle/vehicle.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ServiceComponent} from "./service/service.component";
import {GradeComponent} from "./grade/grade.component";
import {TypeComponent} from "./type/type.component";
import {AssignmentComponent} from "./assignment/assignment.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AssignmentValideComponent} from "./assignment-valide/assignment-valide.component";
import {TauxComponent} from "./taux/taux.component";
import {DemandeMissionComponent} from "./demande-mission/demande-mission.component";

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", component:LoginComponent},
  {path:"admin", component:AdminTemplateComponent,
    children : [
      {path:"personals", component:PersonalComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"towns", component:TownComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"worksites", component:WorksiteComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"vehicles", component:VehicleComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"dashboard", component:DashboardComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"header", component:HeaderComponent},
      {path:"sidebar", component:SidebarComponent},
      {path:"services", component:ServiceComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"types", component:TypeComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"taux", component:TauxComponent
        ,canActivate:[AuthenticationGuard],data:{roles:['ADMIN']}},
      {path:"assignments", component:AssignmentComponent
        },
      {path:"assignment-valide", component:AssignmentValideComponent
        },
      {path:"demande-mission", component:DemandeMissionComponent
        },
      {path:"forbidden", component:ForbiddenComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
