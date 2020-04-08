import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: string;
  username: string;
  user: any = null;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private dataUserService: DataUserService
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
    this.dataUserService.getAllUser().subscribe(user => {
      if (user instanceof Object) {
        console.log(user);
        this.user = user;
        this.username = user.username;
      }
    });
  }

  logOut() {
    this.authService.logout();
  }
}
