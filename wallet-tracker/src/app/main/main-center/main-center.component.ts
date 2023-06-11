import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from './transaction.model';
import { Subscription } from 'rxjs';
import { MainCenterService } from './main-center.service';

@Component({
  selector: 'app-main-center',
  templateUrl: './main-center.component.html',
  styleUrls: ['./main-center.component.css']
})
export class MainCenterComponent implements OnInit, OnDestroy {
  sections = ['Categories', 'Subscriptions', 'Obligatory', 'Statistic', 'Admin'];
  transactions: Transaction[];
  private subscription: Subscription;
  selectedSection: string | null = null;

  constructor(private mainCenterService:MainCenterService){}
  
  selectSection(section: string): void {
    this.selectedSection = section;
  }
  onEditTransaction(){

  }
  ngOnInit(): void {
    this.transactions = this.mainCenterService.getTransactions();
    this.subscription = this.mainCenterService.transactionsChanged
    .subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      }
    );
  }
  ngOnDestroy(): void {

  }
  //Search filter
  // filteredTransactionList: HousingLocation[] = [];

}
