import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Category } from 'src/app/main/main-center/category.model';
import { Transaction } from 'src/app/main/main-center/transaction.model';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

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
    private router: Router,
    private storage: AngularFireStorage,
    private location: Location,
    private authService: AuthService
  ) {}

  readonly transactions$ = this.transactionsApiService.getAllTransaction();
  selectedOption: string;
  id: number;
  editMode = false;
  incomeOrExpenseBool = false;
  selectedFiles: File[] = [];
  imageUrls: string[] = [];
  maxImages = 4;
  maxSelections = 3;
  maxSelectionsReached = false;

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
    if (this.transactionForm.valid) {
      console.log(values);
      console.log(this.transactions$);

      // Get the user's authentication token from the AuthService
      this.authService.user.subscribe((user) => {
        if (user) {
          const userEmail = user.email;

          // Loop through the selected files and upload each one
          this.selectedFiles.forEach((file) => {
            const transactionId = this.transactionsApiService.getTransactionId();
            const filePath = `${userEmail}/${transactionId}/${new Date().getTime()}_${file.name}`;
            console.log(filePath);

            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, file);

            // Set the authentication token in the request headers
            task.snapshotChanges()
              .pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe((url) => {
                    console.log(url);
                  });
                })
              )
              .subscribe();
          });
        } else {
          console.error('User not authenticated.');
        }
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
    this.incomeOrExpenseBool = (data === 'income');
    console.log(this.incomeOrExpenseBool);
  }
  toggleOption(option: string) {
    this.selectedOption = option;
    // Store the selected option in local storage
    localStorage.setItem('selectedOption', this.selectedOption);
  }
  onFileSelected(fileInput: HTMLInputElement) {
    const files: FileList = fileInput.files;
    // this.selectedFiles = [];
    // this.imageUrls = [];
    if (this.selectedFiles.length + files.length > this.maxImages) {
      // Display an error message or prevent further selection
      console.log(`Maximum ${this.maxImages} images can be selected.`);
      return;
    }
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
  onCancel() {
    this.transactionForm.reset();
    this.selectedFiles = [];
    this.imageUrls = [];
    // this.router.navigate(['main']);
    this.location.back();
  }
  limitSelection(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions);

    if (selectedOptions.length > this.maxSelections) {
      // If the user selects more than the allowed limit, unselect the last selected option
      selectedOptions.forEach((option) => {
        option.selected = false;
        this.maxSelectionsReached = true;
      });
    }
  }

}
