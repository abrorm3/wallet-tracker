import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent {
  userEmail = this.authService.user.value.email;
  showIncome: boolean = false;
  showExpense: boolean = false;


  constructor(private authService:AuthService,
    ){}
  logOut(){
    this.authService.logout();
  }
  incomeFilter(){

  }
  expenseFilter(){

  }
}
