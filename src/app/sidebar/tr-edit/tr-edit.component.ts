import { Component } from '@angular/core';


class Category {
  constructor(public name: string) { }
}
@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css']
})
export class TrEditComponent {

  selectedOption: string;
  categoryList: Category[]=[
    new Category("Something"),
    new Category("ANotherCat")
  ]

  ngOnInit() {
    // Retrieve the previously selected option from local storage
    this.selectedOption = localStorage.getItem('selectedOption');
  }

  toggleOption(option: string) {
    this.selectedOption = option;
    // Store the selected option in local storage
    localStorage.setItem('selectedOption', this.selectedOption);
  }
}

