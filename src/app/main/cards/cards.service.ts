import { Injectable } from '@angular/core';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cards: Card[] = [
    new Card('Debit Card', 5237, 'assets/icons/$.png'),
    new Card('Debit Card', 22137, 'assets/icons/$.png'),
  ];

  getCards() {
    return this.cards.slice();
  }
}
