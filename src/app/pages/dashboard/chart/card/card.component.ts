import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  title = {
    infections: 'Infections',
    deaths: 'Deaths',
    recoveries: 'Recoveries',
    criticals: 'Criticals'
  };
  showMore: string;
  color: string;

  @Input() titleCard: string;
  @Input() dataInput: number;
  @Input() moreData: number;
  @Input() loading: boolean;

  constructor() {}

  ngOnInit() {
    switch(this.titleCard) {
      case this.title.infections:
        this.showMore = 'cases today';
        this.color = '#7367F0';
        break;
      case this.title.deaths:
        this.showMore = 'today';
        this.color = '#EA5455';
        break;
      case this.title.recoveries:
        this.showMore = 'remaining';
        this.color = '#28C76F';
        break;
      case this.title.criticals:
        this.showMore = 'case per million';
        this.color = '#FF9F43';
        break;
      default:
        break;
    }
  }
}
