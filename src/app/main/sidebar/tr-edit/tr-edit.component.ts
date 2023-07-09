import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Category } from 'src/app/main/main-center/category.model';
import { Transaction } from 'src/app/main/main-center/transaction.model';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css'],
})
export class TrEditComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private transactionsApiService: TransactionsApiService,
    private route: ActivatedRoute
  ) {}
  selectedOption: string;
  id: number;
  editMode = false;
  transactionForm: FormGroup;

  categoryList: Category[] = [];
  transaction: Transaction[] = [
    new Transaction(
      'Salary for June',
      'asd',
      'Salary from nowhere, cause you are jobless',
      true,
      new Date(2011, 0o5, 10),
      1.0
    ),
  ];

  ngOnInit() {
    // Retrieve the previously selected option from local storage
    this.selectedOption = localStorage.getItem('selectedOption');
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.transactionsApiService.getTransactionData().subscribe((data)=>{
      console.log(data);

    })
    // const s = new Category(
    //   ''
    // )
    // this.dataStorageService.addCategory(s).subscribe();
  }
  onSubmit() {}
  getCategories() {
    this.dataStorageService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = Object.values(res);
        console.log(this.categoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  private initForm() {
    let transactionTitle = '';
    let transactionCategory = '';
    let transactionAmount = '';
    let transactionDate = '';
    let transactionDescription = '';

    this.transactionForm = new FormGroup({
      title: new FormControl(transactionTitle, Validators.required),
      category: new FormControl(transactionCategory, Validators.required),
      amount: new FormControl(transactionAmount, Validators.required),
      date: new FormControl(transactionDate, Validators.required),
      description: new FormControl(transactionDescription, Validators.required)
    })
  }

  toggleOption(option: string) {
    this.selectedOption = option;
    // Store the selected option in local storage
    localStorage.setItem('selectedOption', this.selectedOption);
  }
}
