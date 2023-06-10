import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';
import { SecCategoriesComponent } from './sec-categories/sec-categories.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainCenterService {
  transactionsChanged = new Subject<Transaction[]>();
  private transactions: Transaction[] = [
    new Transaction(
      'Flat rent for March',
      SecCategoriesComponent,
      'Payment for Charvak dacha',
      false,
      new Date(),
      650.0
    ),
  ];
  addTransaction(transaction:Transaction){
    this.transactions.push(transaction);
  }
  getTransactions(){
    return this.transactions.slice();
  }
  }
