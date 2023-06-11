import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model';
import { CardsService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;
  cards: Card[];
constructor(private cardsService:CardsService){}

  selectedCard?: Card;

  onSelect(card:Card){
    this.selectedCard = card;
  }
  ngOnInit() {
    this.cards = this.cardsService.getCards();
  }
}
