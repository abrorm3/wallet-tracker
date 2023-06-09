import { Component } from '@angular/core';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.css']
})
export class MainCenterComponent {
  sections = ['Categories', 'Subscriptions', 'Obligatory', 'Statistic', 'Admin'];
  selectedSection: string | null = null;

  selectSection(section: string): void {
    this.selectedSection = section;
  }
}
