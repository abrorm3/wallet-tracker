import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var $: any; // Declare the global variable for jQuery

@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css']
})
export class TrEditComponent implements AfterViewInit {
  @ViewChild('chosenSelect', { static: true }) chosenSelect: ElementRef;

  options: Option[] = [
    { value: 'option1', label: 'Option 1', disabled: false },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3', disabled: false }
  ];

  selectedOption: string;

  ngAfterViewInit() {
    const selectElement = $(this.chosenSelect.nativeElement);

    // Set the placeholder text for Chosen
    selectElement.attr('data-placeholder', 'Select an option...');

    // Dynamically update the <select> element with the options
    for (const option of this.options) {
      const optionElement = $('<option></option>')
        .val(option.value)
        .text(option.label);

      if (option.disabled) {
        optionElement.attr('disabled', 'disabled');
      }

      selectElement.append(optionElement);
    }
    // Initialize Chosen plugin
    selectElement.chosen();
  }

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

interface Option {
  value: string;
  label: string;
  disabled: boolean;
}
