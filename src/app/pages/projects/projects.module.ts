import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects.-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NzIconModule
  ]
})
export class ProjectsModule { }
