import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model';
import { CARDS } from './cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;

  cards = CARDS;
  selectedCard?: Card;

  onSelect(card:Card){
    this.selectedCard = card;
  }
  ngOnInit() {

  }
}
