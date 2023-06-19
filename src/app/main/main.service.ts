import { Injectable } from '@angular/core';
import { Card } from './cards/card.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private cards: Card[] = [
    new Card(
      'Debit Card',
      5357.18,
      'assets/icons/$.png'
    )
  ];

  constructor(){

  }

}
