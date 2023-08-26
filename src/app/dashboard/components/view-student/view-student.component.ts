import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Student } from '../../interfaces/dashboard.interface';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent {
  public student!: Student;
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    const id: number | any = this.route.snapshot.paramMap.get('id');
    this.dashboardService.getStudent(id).subscribe((student: Student) => {
      this.student = student;
    });
  }
}
