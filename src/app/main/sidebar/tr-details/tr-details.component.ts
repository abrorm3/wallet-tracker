import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-tr-details',
  templateUrl: './tr-details.component.html',
  styleUrls: ['./tr-details.component.css'],
})
export class TrDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private transactionsApiService: TransactionsApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.transactionsApiService.getTransactionData().subscribe((data) => {
      console.log(data);

    })


  }

  editTransaction() {
    const currentUrl = this.router.url;
    const editUrl = currentUrl.replace('/details', '/edit');
    this.router.navigateByUrl(editUrl);
  }

  // deleteTransaction() {
  //   this.transactionsApiService.deleteTransaction().subscribe(
  //     (response) => {
  //       console.log('Transaction deleted successfully:', response);
  //       // Do something after successful deletion, like navigating back or reloading data.
  //     },
  //     (error) => {
  //       console.error('Error while deleting transaction:', error);
  //       // Handle error if needed
  //     }
  //   );
  // }
  deleteTransaction() {
    this.transactionsApiService.deleteTransaction().subscribe({
      next: (response) => {
        console.log('Transaction deleted successfully:');
        this.router.navigate(['main']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      }
  });
  }

  onCancel() {
    this.location.back();
  }
  ngOnDestroy(): void {

  }
}
