import { Component } from '@angular/core';


@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css']
})
export class TrEditComponent {

  selectedOption: string;


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

