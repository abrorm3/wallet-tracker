import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import { MainComponent } from './main/main.component';
import { CardsComponent } from './main/cards/cards.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SecCategoriesComponent } from './main/main-center/sec-categories/sec-categories.component';
import { SecSubscriptionsComponent } from './main/main-center/sec-subscriptions/sec-subscriptions.component';
import { SecObligatoryComponent } from './main/main-center/sec-obligatory/sec-obligatory.component';
import { SecStatisticComponent } from './main/main-center/sec-statistic/sec-statistic.component';
import { SecAdminComponent } from './main/main-center/sec-admin/sec-admin.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    MainComponent,
    CardsComponent,
    MainCenterComponent,
    SecCategoriesComponent,
    SecSubscriptionsComponent,
    SecObligatoryComponent,
    SecStatisticComponent,
    SecAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
