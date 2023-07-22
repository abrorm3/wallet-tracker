import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from './transaction.model';
import { Subscription } from 'rxjs';
import { MainCenterService } from './main-center.service';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

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

  readonly transactions$ = this.transactionsApiService.getAllTransaction();
  private subscription: Subscription[] = [];
  selected: string | null = null;
  constructor(
    private mainCenterService: MainCenterService,
    private transactionsApiService: TransactionsApiService,
    private router:Router

  ) {}
  selectSection(section: string): void {
    this.mainCenterService.selectedSection.next(section);
  }

  ngOnInit(): void {
    // this.transactionsApiService.getAllTransaction();
    const t = new Transaction(
      'Flat rent for March',
      'Home',
      'Payment for Charvak dacha',
      false,
      new Date(2023, 2, 10),
      650.0
    );
    // this.mainCenterService.addTransaction(t).subscribe();

    const selectedSection = this.mainCenterService.selectedSection.subscribe(
      (section: string | null) => {
        this.selected = section;
      }
    );
    this.subscription.push(selectedSection);
  }
  onEditTransaction(transactionId: string) {
    this.transactionsApiService.getTransaction(transactionId, 'edit');
    console.log(transactionId);
  }
  onDetailsTransaction(transactionId: string) {
    this.transactionsApiService.getTransaction(transactionId, 'details');
    console.log(transactionId);
  }
  //Search filter
  // filteredTransactionList: HousingLocation[] = [];
  ngOnDestroy(): void {
    for (const subscription of this.subscription) {
      subscription.unsubscribe();
    }
  }
}
