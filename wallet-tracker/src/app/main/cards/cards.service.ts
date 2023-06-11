import { Card } from './card.model';

export class CardsService {
  private cards: Card[] = [
    new Card('Debit Card', 5237, 'assets/icons/$.png'),
    new Card('Debit Card', 22137, 'assets/icons/$.png')
  ];

  getCards(){
    return this.cards.slice();
  }
}
