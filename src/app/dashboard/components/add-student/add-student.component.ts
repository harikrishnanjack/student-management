import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  registrationForm!: FormGroup;
  classes = [1, 2, 3, 4, 5, 6, 7];
  divisions = ['A', 'B', 'C', 'D'];
  years = [2020, 2021, 2022];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      age: ['', Validators.required],
      classes: ['', Validators.required],
      division: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { name, url, age, classes, division, year } =
        this.registrationForm.value;
      const registrationpayload = {
        id: Math.floor(Math.random() * 500) + 1,
        editable: false,
        editing: false,
        name,
        profilephoto: url,
        age,
        classes,
        division,
        year,
      };
      console.log(registrationpayload);
      this.dashboardService
        .createStudent(registrationpayload)
        .subscribe((data) => {
          console.log(data);
          this.openSnackBar('New Student Added');
          this.router.navigateByUrl('/dashboard/home');
        });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
