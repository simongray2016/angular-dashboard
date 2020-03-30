import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDataService } from '../../services/getData.service';
import { Total } from '../../models/total.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loading = true;
  total: Total;
  dataLineChart$ = this.getDataService.dataLineChart$;
  dataPipeChart$ = this.getDataService.dataPipeChart$;

  destroy$: Subject<null> = new Subject<null>();

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.getAll().pipe(takeUntil(this.destroy$)).subscribe();
    this.getDataService.total$.pipe(takeUntil(this.destroy$)).subscribe(t => this.total = t);
    this.getDataService.getTimelineGlobal().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
