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
    this.getTransactions();
    const t = new Transaction(
          'Flat rent for March',
          "Home",
          'Payment for Charvak dacha',
          false,
          new Date(2023,2,10),
          650.0
        )
    // this.mainCenterService.addTransaction(t).subscribe();


    const selectedSection = this.mainCenterService.selectedSection.subscribe(
      (section: string | null) => {
        this.selected = section;
      }
    );
    this.subscription.push(selectedSection);
  }
  getTransactions(){
    this.mainCenterService.getTransactions().subscribe({
      next: (res) =>{
        this.transactions = Object.values(res);
        console.log(this.transactions);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  //Search filter
  // filteredTransactionList: HousingLocation[] = [];
  ngOnDestroy(): void {
    for (const subscription of this.subscription) {
      subscription.unsubscribe();
    }
  }
}
