import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.const';
import { Observable, map } from 'rxjs';
import { objectToArray } from './utils/objectArray';
import { FirebaseResponse } from './interfaces/firebase.interface';
import {
  FirebaseTransaction,
  Transaction,
} from './interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  constructor(private httpClient: HttpClient) {}

  getAllTransaction(): Observable<Transaction[]> {
    return this.httpClient
      .get<FirebaseResponse<FirebaseTransaction>>(
        BASE_URL + '/transactions.json'
      )
      .pipe(
        map((response) =>
          objectToArray<Transaction, FirebaseTransaction>(response)
        )
      );
  }
}
