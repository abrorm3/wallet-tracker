import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Category } from 'src/app/main/main-center/category.model';
import { Transaction } from 'src/app/main/main-center/transaction.model';


@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css']
})
export class TrEditComponent {
  constructor(private dataStorageService: DataStorageService){}
  selectedOption: string;
  categoryList: Category[]=[
  ];
  transaction: Transaction[] = [new Transaction(
        'Salary for June',
        'asd',
        'Salary from nowhere, cause you are jobless',
        true,
        new Date(2011,0o5,10),
        1.00
      )];

  ngOnInit() {
    // Retrieve the previously selected option from local storage
    this.selectedOption = localStorage.getItem('selectedOption');
    this.getCategories();
    // const s = new Category(
    //   ''
    // )
    // this.dataStorageService.addCategory(s).subscribe();

  }
  getCategories(){
    this.dataStorageService.getCategories().subscribe({
      next: (res) =>{
        this.categoryList = Object.values(res);
        console.log(this.categoryList);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleOption(option: string) {
    this.selectedOption = option;
    // Store the selected option in local storage
    localStorage.setItem('selectedOption', this.selectedOption);
  }

}

