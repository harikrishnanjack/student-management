import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { CommonComponentModule } from '../common/common.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material/material/material.module';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, AddStudentComponent, ViewStudentComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CommonComponentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
