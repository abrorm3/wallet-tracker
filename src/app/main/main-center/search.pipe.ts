import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from './transaction.model';
import { FirebaseTransaction } from 'src/app/shared/interfaces/transaction.interface';

interface TransactionWithId extends FirebaseTransaction {
  id: string;
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(transactions: FirebaseTransaction[], searchTerm: string): TransactionWithId[] {
    if (!transactions || !searchTerm) {
      return transactions as TransactionWithId[];
    }

    searchTerm = searchTerm.toLowerCase();
    return transactions
      .filter(transaction => transaction.title.toLowerCase().includes(searchTerm))
      .map(transaction => ({
        id: '', // Since id is not available in FirebaseTransaction, set an empty string for now
        ...transaction
      })) as TransactionWithId[];
  }
}
