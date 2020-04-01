import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: string;
  user: any;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
    ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (this.location.path().includes('/dashboard')) {
        this.name = 'Corona Live';
      } else if (this.location.path().includes('/user')) {
        this.name = 'Profile';
      }
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }

  logOut() {
    this.authService.logout()
      .then(() => this.router.navigate(['auth/login']));
  }
}
