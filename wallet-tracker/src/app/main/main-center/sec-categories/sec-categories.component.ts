import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-sec-categories',
  templateUrl: './sec-categories.component.html',
  styleUrls: ['./sec-categories.component.css']
})
export class SecCategoriesComponent {
  @Input() transaction: Transaction;
  

}
