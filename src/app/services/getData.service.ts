import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Total } from '../models/total.model';
import { DataLineChart, Series } from '../models/dataLineChart.model';
import { DataPipeChart } from '../models/dataPipeChart.model';
import { Country } from '../models/country.model';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private api = 'https://api.coronastatistics.live';

  private countries: Country[];
  private total: Total = {
    cases: 0,
    deaths: 0,
    recovered: 0,
    critical: 0,
    active: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    todayCases: 0,
    todayDeaths: 0,
  };
  private dataLineChart: DataLineChart[] = [];
  private dataPipeChart: DataPipeChart[] = [];
  private rateCountries: DataPipeChart[] = [];
  private filteredCountries: Country[] = [];

  private totalSubject: BehaviorSubject<Total> = new BehaviorSubject<Total>(this.total);
  private dataLineSubject: BehaviorSubject<DataLineChart[]> = new BehaviorSubject<DataLineChart[]>(this.dataLineChart);
  private dataPipeSubject: BehaviorSubject<DataPipeChart[]> = new BehaviorSubject<DataPipeChart[]>(this.dataPipeChart);
  private rateCoutriesSubject: BehaviorSubject<DataPipeChart[]> = new BehaviorSubject<DataPipeChart[]>(this.rateCountries);
  private filteredCountriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(this.filteredCountries);

  dataLineChart$: Observable<DataLineChart[]> = this.dataLineSubject.asObservable();
  dataPipeChart$: Observable<DataPipeChart[]> = this.dataPipeSubject.asObservable();
  rateCountries$: Observable<DataPipeChart[]> = this.rateCoutriesSubject.asObservable();
  total$: Observable<Total> = this.totalSubject.asObservable();
  filteredCountries$: Observable<Country[]> = this.filteredCountriesSubject.asObservable();


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.api}/countries?sort=todayCases`).pipe(
      catchError(this.handleError),
      tap(data => {
        this.countries = data;
        this.getTotal(this.countries);
        this.getRate();
        this.filteredCountriesSubject.next(data);
      }),
    );
  }

  getTimelineGlobal(){
    return this.http.get(`${this.api}/timeline/global`).pipe(
      retry(1),
      catchError(this.handleError),
      tap(data => {
        this.convertDataForLineChart(data);
      })
    );
  }

  getTimeline(){
    return this.http.get(`${this.api}/timeline`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  sort(key: string | null, name: string | null) {
    this.filteredCountries = [...this.countries];
    if (key && name) {
      this.filteredCountries.sort((a, b) => {
        if (name === 'ascend') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return b[key] > a[key] ? 1 : -1;
        }
      });
      this.filteredCountriesSubject.next([...this.filteredCountries]);
      console.log(this.filteredCountries);
    } else {
      this.filteredCountriesSubject.next([...this.filteredCountries]);
    }
  }

  search(text: string) {
    const query = text.toLowerCase().trim();
    if (query) {
      this.filteredCountries = this.countries.filter(c => c.country.toLowerCase().includes(text));
      this.filteredCountriesSubject.next([...this.filteredCountries]);
    } else {
      this.filteredCountries = [...this.countries];
      this.filteredCountriesSubject.next([...this.filteredCountries]);
    }
  }

  private handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert('Please check your internet connection!.');
    return throwError(errorMessage);
  }

  private getTotal(global: Country[]) {
    const keys =  Object.keys(this.total);
    for (const key of keys) {
      this.total[key] = global.reduce((total, curr) => {
        return total += curr[key];
      }, 0);
    }
    this.totalSubject.next(this.total);
    this.convertDataForPipeChart(this.total);
  }

  private getRate() {
    const total = this.total.cases;
    const sortedCountries = [...this.countries].sort((a, b) =>
      a.cases < b.cases ? 1 : -1
    ).map(c => ({
      name: this.toUpperFirstLetter(c.country),
      value: c.cases
    })).slice(0, 3);
    const left = {
      name: 'Other',
      value: total - sortedCountries.reduce((sum, c) => sum += c.value, 0)
    };
    this.rateCountries = [...sortedCountries, left];
    this.rateCoutriesSubject.next([...this.rateCountries]);
  }

  private convertDataForPipeChart(data: any) {
    const names = ['active', 'deaths', 'recovered', 'critical'];

    this.dataPipeChart = names.map(name => ({
      name: this.toUpperFirstLetter(name),
      value: data[name]
    }));

    this.dataPipeSubject.next(this.dataPipeChart);
  }

  private convertDataForLineChart(data: any) {
    const keys = Object.keys(data);
    const names = Object.keys(data[keys[0]]);
    const list: DataLineChart[] = [];

    for (const name of names) {
      const dataLineChart: DataLineChart = {
        name: this.toUpperFirstLetter(name),
        series: []
      };

      dataLineChart.series = keys.map(key => ({
          name: key,
          value: data[key][name]
      }));
      list.push(dataLineChart);
    }
    this.dataLineChart = [...list];
    this.dataLineSubject.next([...this.dataLineChart]);
  }

  private toUpperFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
