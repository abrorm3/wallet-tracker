import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, FormsModule, CommonModule],
})
export class AuthModule {}
