import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from './cards/card.model';
import { MainCenterService } from './main-center/main-center.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private mainCenterService: MainCenterService, private authService: AuthService, private router:Router) {}
  userEmail = this.authService.user.value.email;
  cards: Card[];
  showFiller = false;

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
  logOut(){
    this.authService.logout();
  }
  siteName(){
    this.mainCenterService.selectedSection.next(null);
    this.router.navigate(['/main']);
  }
}
