import { Component, OnInit, Input } from '@angular/core';
import { DataPipeChart } from 'src/app/models/dataPipeChart.model';
import { GetDataService } from 'src/app/services/getData.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pipe-gird-chart',
  templateUrl: './pipe-gird-chart.component.html',
  styleUrls: ['./pipe-gird-chart.component.scss']
})
export class PipeGirdChartComponent implements OnInit {

  data: DataPipeChart[];

  @Input() destroy$: Observable<null>;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.rateCountries$.pipe(takeUntil(this.destroy$)).subscribe(data => this.data = Array.from(data));
  }

}
