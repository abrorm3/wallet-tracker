import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CardsComponent } from './main/cards/cards.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SecCategoriesComponent } from './main/main-center/sec-categories/sec-categories.component';
import { SecSubscriptionsComponent } from './main/main-center/sec-subscriptions/sec-subscriptions.component';
import { SecObligatoryComponent } from './main/main-center/sec-obligatory/sec-obligatory.component';
import { SecStatisticComponent } from './main/main-center/sec-statistic/sec-statistic.component';
import { SecAdminComponent } from './main/main-center/sec-admin/sec-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrEditComponent } from './main/sidebar/tr-edit/tr-edit.component';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { environment } from '../environments/environment';
import { TrDetailsComponent } from './main/sidebar/tr-details/tr-details.component';

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
    TrDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],

  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
