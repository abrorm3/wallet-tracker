import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsApiService } from 'src/app/shared/transactions-api.service';
import {Location} from '@angular/common';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tr-details',
  templateUrl: './tr-details.component.html',
  styleUrls: ['./tr-details.component.css'],
})
export class TrDetailsComponent implements OnInit, OnDestroy {
  transactionData:any;
  cardCurrency = '$';
  id: string;
  attachmentsAvailable = true;
attachments: { url: string, filename: string }[] = [];

  constructor(
    private router: Router,
    private transactionsApiService: TransactionsApiService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private http: HttpClient,
  ) {}


  ngOnInit(): void {
    this.transactionsApiService.getTransactionData().pipe(take(1))
    .subscribe((data) => {
      console.log(data);
      this.transactionData = data;
    })
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.downloadImg();
  }

  editTransaction() {
    const currentUrl = this.router.url;
    const editUrl = currentUrl.replace('/details', '/edit');
    this.router.navigateByUrl(editUrl);
  }

  // deleteTransaction() {
  //   this.transactionsApiService.deleteTransaction().subscribe(
  //     (response) => {
  //       console.log('Transaction deleted successfully:', response);
  //       // Do something after successful deletion, like navigating back or reloading data.
  //     },
  //     (error) => {
  //       console.error('Error while deleting transaction:', error);
  //       // Handle error if needed
  //     }
  //   );
  // }
  deleteTransaction() {
    this.transactionsApiService.deleteTransaction().subscribe({
      next: (response) => {
        console.log('Transaction deleted successfully:');
        this.router.navigate(['main']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      }
  });
  }
  downloadImg() {
    const folderPath = this.authService.user.value.email + "/" + this.transactionsApiService.getTransactionId();
    const storageRef = this.storage.refFromURL('gs://wallet-tracker-57bf6.appspot.com/' + folderPath);

    storageRef.listAll().subscribe((result) => {
      // Check if there are any attachments
      this.attachmentsAvailable = result.items.length > 0;

      if (this.attachmentsAvailable) {
        this.attachments = []; // Clear the existing attachments array
        result.items.forEach((item) => {
          item.getDownloadURL().then((url) => {
            // Store the attachment URL and filename in the attachments array
            this.attachments.push({ url: url, filename: item.name });
          });
        });
      }
    });
  }
  private downloadImage(url: string, filename: string) {
    // Use Angular HttpClient to download the image
    this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = filename;

      // Append the anchor to the body and trigger the click event to start the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
  }
  downloadAttachments() {
    if (this.attachmentsAvailable) {
      // Loop through the attachments and download each one
      this.attachments.forEach((attachment) => {
        this.downloadImage(attachment.url, attachment.filename);
      });
    }
  }


  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {

  }
}
