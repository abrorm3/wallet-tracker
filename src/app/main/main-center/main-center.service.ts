import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';
import { SecCategoriesComponent } from './sec-categories/sec-categories.component';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/app.const';

@Injectable({
  providedIn: 'root',
})
export class MainCenterService {
  categoryTypes: string[] = ['Home', 'Rent', 'Shopping', 'Salary','Dept','Fun','Music'];
  selectedCatType:string = '';
  selectedSection= new Subject<string | null>();
  constructor(private http:HttpClient){}
  transactionsChanged = new Subject<Transaction[]>();

  private transactions: Transaction[] = [
  //   new Transaction(
  //     'Flat rent for March',
  //     this.categoryTypes[0],
  //     'Payment for Charvak dacha',
  //     false,
  //     new Date(2023,02,10),
  //     650.0
  //   ),
  //   new Transaction(
  //     'Shopping in Korzinka',
  //     this.categoryTypes[2],
  //     'Buy some groceries, and a hoodie',
  //     false,
  //     new Date(2023,03,20),
  //     210.0
  //   ),

  //   new Transaction(
  //     'Salary for June',
  //     this.categoryTypes[3],
  //     'Salary from nowhere, cause you are jobless',
  //     true,
  //     new Date(2023,05,10),
  //     1.00
  //   ),
  ];
  addTransaction(transaction:Transaction){
    return this.http.post<any>(BASE_URL+'/transactions.json', transaction,{
      headers: new HttpHeaders({

      })
    })

  }
  getTransactions(){
    return this.http.get<Transaction[]>(BASE_URL+'/transactions.json')
  }
  getTransaction(index:number){
    return this.transactions[index];
  }
}
