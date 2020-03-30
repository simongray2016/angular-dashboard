import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from 'src/app/services/getData.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  inputText = '';
  data$ = this.getDataService.filteredCountries$;

  @Input() destroy$: Observable<null>;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  sort(sort: {key: string | null, value: string | null}) {
    this.getDataService.sort(sort.key, sort.value);
  }

  showResult() {
    this.getDataService.search(this.inputText);
  }

}
