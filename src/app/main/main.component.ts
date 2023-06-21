import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from './cards/card.model';
import { MainCenterService } from './main-center/main-center.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private mainCenterService: MainCenterService) {

  }
  cards: Card[];
  showFiller = false;

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
  siteName(){
    this.mainCenterService.selectedSection.next(null);
  }
}
