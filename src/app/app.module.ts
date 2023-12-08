import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgChartsModule} from "ng2-charts";
import { VehicleComponent } from './vehicle/vehicle.component';
import { TownComponent } from './town/town.component';
import { WorksiteComponent } from './worksite/worksite.component';
import { PersonalComponent } from './personal/personal.component';
import { ServiceComponent } from './service/service.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewTownComponent } from './new-town/new-town.component';
import { GradeComponent } from './grade/grade.component';
import { TypeComponent } from './type/type.component';
import { AssignmentComponent } from './assignment/assignment.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbdDatepickerRange} from "./assignment/datepicker-range";
import {NgbdDatepickerRangePopup} from "./assignment/datepicker-range-popup";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationService } from './services/authentication.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {AuthInterceptor} from "./guards/auth.interceptor";
import {PersonalService} from "./services/personal.service";
import { AssignmentValideComponent } from './assignment-valide/assignment-valide.component';
import { TauxComponent } from './taux/taux.component';
import { DecompteComponent } from './decompte/decompte.component';
import { ModalComponent } from './modal/modal.component';
import { DemandeMissionComponent } from './demande-mission/demande-mission.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    VehicleComponent,
    TownComponent,
    WorksiteComponent,
    PersonalComponent,
    ServiceComponent,
    NewTownComponent,
    GradeComponent,
    TypeComponent,
    AssignmentComponent,
    LoginComponent,
    AdminTemplateComponent,
    ForbiddenComponent,
    AssignmentValideComponent,
    TauxComponent,
    DecompteComponent,
    ModalComponent,
    DemandeMissionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    NgbModule,
    NgbdDatepickerRange,
    NgbdDatepickerRangePopup,

  ],
  providers: [AuthenticationService,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
    PersonalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
