import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';
import { SecCategoriesComponent } from './sec-categories/sec-categories.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainCenterService {
  categoryTypes: string[] = ['Home', 'Rent', 'Shopping', 'Salary','Dept','Fun','Music'];
  selectedCatType:string = '';

  transactionsChanged = new Subject<Transaction[]>();
  private transactions: Transaction[] = [
    new Transaction(
      'Flat rent for March',
      this.categoryTypes[0],
      'Payment for Charvak dacha',
      false,
      '28.02.2023',
      650.0
    ),
    new Transaction(
      'Shopping in Korzinka',
      this.categoryTypes[2],
      'Buy some groceries, and a hoodie',
      false,
      '27.02.2023',
      210.0
    ),

    new Transaction(
      'Salary for June',
      this.categoryTypes[3],
      'Salary from nowhere, cause you are jobless',
      true,
      '27.02.2023',
      1.00
    ),
  ];
  addTransaction(transaction:Transaction){
    this.transactions.push(transaction);
  }
  getTransactions(){
    return this.transactions.slice();
  }
  }
