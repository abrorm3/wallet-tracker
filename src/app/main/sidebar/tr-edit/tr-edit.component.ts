import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Category } from 'src/app/main/main-center/category.model';
import { Transaction } from 'src/app/main/main-center/transaction.model';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tr-edit',
  templateUrl: './tr-edit.component.html',
  styleUrls: ['./tr-edit.component.css'],
})
export class TrEditComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private transactionsApiService: TransactionsApiService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}

  selectedOption: string;
  id: number;
  editMode = false;
  incomeOrExpenseBool = false;
  selectedFiles: File[] = [];
  imageUrls: string[] = [];

  transactionForm: FormGroup = new FormGroup({
    income: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    categoryType: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

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
  some = null;
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  ngOnInit() {
    this.selectedOption = localStorage.getItem('selectedOption');
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.transactionsApiService.getTransactionData().subscribe((data) => {
      if (data) {
        const date = new Date(data['date']);
        this.transactionForm.patchValue({
          income: data['income'],
          amount: data['amount'],
          title: data['title'],
          categoryType: data['categoryType'],
          description: data['description'],
          date: this.formatDate(data['date']),
        });
        console.log(data);
      }
    });

    // const s = new Category(
    //   ''
    // )
    // this.dataStorageService.addCategory(s).subscribe();
  }
  onSubmit(values) {
    if (this.transactionForm.valid && this.selectedFiles.length > 0) {
      console.log(values);
      this.selectedFiles.forEach((file) => {
        const filePath = `docs/${file.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage
          .upload(filePath, file)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                console.log(url);
              });
            })
          )
          .subscribe();
      });
    }
  }
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
  incomeOrExpense(data: string) {
    if (data === 'income') {
      this.incomeOrExpenseBool = true;
    } else {
      this.incomeOrExpenseBool = false;
    }
    console.log(this.incomeOrExpenseBool);
  }
  toggleOption(option: string) {
    this.selectedOption = option;
    // Store the selected option in local storage
    localStorage.setItem('selectedOption', this.selectedOption);
  }
  addImage() {}
  onFileSelected(fileInput: HTMLInputElement) {
    const files: FileList = fileInput.files;
    this.selectedFiles = [];
    this.imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.selectedFiles.push(file);
      const imageUrl = URL.createObjectURL(file);
      this.imageUrls.push(imageUrl);
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imageUrls.splice(index, 1);
  }
}
