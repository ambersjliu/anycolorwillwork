import { Component, inject, OnInit } from '@angular/core';
import { SummaryInfo } from '../../interfaces/summary-info';
import { SummaryService } from '../../services/summary/summary.service';
import { ViewStateService } from '../../services/view-state/view-state.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit{
  viewStateService: ViewStateService = inject(ViewStateService);
  summaryData!: SummaryInfo;
  summaryService: SummaryService = inject(SummaryService);
  ngOnInit(){
    this.summaryData = this.summaryService.getSummaryData();
  }

  playAgain() {
    this.viewStateService.setState('home');
  }
}
