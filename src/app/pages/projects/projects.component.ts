import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any[];
  loading = false;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getAllProject().subscribe(data => {
      this.loading = false;
      this.projects = data._embedded.projects;
    });
  }

}
