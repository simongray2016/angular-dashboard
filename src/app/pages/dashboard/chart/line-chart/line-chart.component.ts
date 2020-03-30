import { Component, OnInit, Input } from '@angular/core';
import { DataLineChart } from 'src/app/models/dataLineChart.model';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetDataService } from 'src/app/services/getData.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  data: DataLineChart[];
  customColors = [
    {
      name: 'Cases',
      value: '#7367F0'
    },
    {
      name: 'Deaths',
      value: '#EA5455'
    },
    {
      name: 'Recovered',
      value: '#28C76F'
    }
  ];
  data$ = this.getDataService.dataLineChart$;

  @Input() titleCard: string;
  @Input() destroy$: Observable<null>;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.data = [...data];
    });
  }

}
