import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CardsComponent } from './main/cards/cards.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SecCategoriesComponent } from './main/main-center/sec-categories/sec-categories.component';
import { SecSubscriptionsComponent } from './main/main-center/sec-subscriptions/sec-subscriptions.component';
import { SecObligatoryComponent } from './main/main-center/sec-obligatory/sec-obligatory.component';
import { SecStatisticComponent } from './main/main-center/sec-statistic/sec-statistic.component';
import { SecAdminComponent } from './main/main-center/sec-admin/sec-admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrEditComponent } from './sidebar/tr-edit/tr-edit.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardsComponent,
    MainCenterComponent,
    SecCategoriesComponent,
    SecSubscriptionsComponent,
    SecObligatoryComponent,
    SecStatisticComponent,
    SecAdminComponent,
    TrEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
