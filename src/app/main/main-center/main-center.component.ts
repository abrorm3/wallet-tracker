import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from './transaction.model';
import { Subscription } from 'rxjs';
import { MainCenterService } from './main-center.service';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.css'],
})
export class MainCenterComponent implements OnInit, OnDestroy {
  sections = [
    'Categories',
    'Subscriptions',
    'Obligatory',
    'Statistic',
    'Admin',
  ];
  transactions: Transaction[] = [];
  private subscription: Subscription[] = [];
  selected: string | null = null;

  constructor(private mainCenterService: MainCenterService) {}
  selectSection(section: string): void {
    this.mainCenterService.selectedSection.next(section);
  }
  onEditTransaction() {
    console.log('Editing');
  }
  ngOnInit(): void {
    this.transactions = this.mainCenterService.getTransactions();
    const trChanged = this.mainCenterService.transactionsChanged.subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      }
    );
    this.subscription.push(trChanged);

    const selectedSection = this.mainCenterService.selectedSection.subscribe(
      (section: string | null) => {
        this.selected = section;
      }
    );
    this.subscription.push(selectedSection);
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscription) {
      subscription.unsubscribe();
    }
    // this.subscription[0].unsubscribe();
  }
  //Search filter
  // filteredTransactionList: HousingLocation[] = [];
}
