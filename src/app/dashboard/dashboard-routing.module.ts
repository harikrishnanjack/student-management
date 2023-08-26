import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'add-student',
        component: AddStudentComponent,
      },
      {
        path: 'view-student/:id',
        component: ViewStudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
