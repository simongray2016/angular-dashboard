import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPipeChart } from 'src/app/models/dataPipeChart.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pipe-chart',
  templateUrl: './pipe-chart.component.html',
  styleUrls: ['./pipe-chart.component.scss']
})
export class PipeChartComponent implements OnInit {

  data: DataPipeChart[];
  colorScheme = {
    domain: ['#7367F0', '#EA5455', '#28C76F', '#FF9F43']
  };
  @Input() titleCard: string;
  @Input() dataInput$: Observable<DataPipeChart[]>;
  @Input() destroy$: Observable<null>;

  constructor() { }

  ngOnInit() {
    this.dataInput$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.data = Array.from(data);
    });
  }

}
