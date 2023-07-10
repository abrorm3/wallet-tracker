import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.const';
import { BehaviorSubject, Observable, ReplaySubject, Subject, catchError, map } from 'rxjs';
import { objectToArray } from './utils/objectArray';
import { FirebaseResponse } from './interfaces/firebase.interface';
import {
  FirebaseTransaction,
  Transaction,
} from './interfaces/transaction.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  private transactionDataSubject: BehaviorSubject<FirebaseTransaction> = new BehaviorSubject<FirebaseTransaction>(null);

  getAllTransaction(): Observable<Transaction[]> {
    return this.httpClient
      .get<FirebaseResponse<FirebaseTransaction>>(
        BASE_URL + '/transactions/' + this.authService.user.value.id + '.json'
      )
      .pipe(
        map((response) =>
          objectToArray<Transaction, FirebaseTransaction>(response).reverse()
        )
      );
  }
  getTransaction(transactionId: string): void {
    this.httpClient
      .get<FirebaseResponse<FirebaseTransaction>>(
        BASE_URL + '/transactions/' + this.authService.user.value.id+'/' + transactionId + '.json'
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((data) => {
        this.transactionDataSubject.next(data);
      });
  }
  getTransactionData(){
    return this.transactionDataSubject.asObservable();
  }
}
