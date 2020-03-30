import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: string

  constructor(private router: Router, private location: Location) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (this.location.path().includes('/dashboard')) {
        this.name = 'Corona Live';
      } else if (this.location.path().includes('/user')) {
        this.name = 'Profile';
      }
    });
  }

  ngOnInit() {
  }
}
