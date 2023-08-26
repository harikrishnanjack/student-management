import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMobileMenu = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  navigateToHome() {
    this.router.navigateByUrl('/dashboard/home');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
