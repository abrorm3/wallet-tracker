import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from './cards/card.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  cards: Card[];

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    
  }
}
