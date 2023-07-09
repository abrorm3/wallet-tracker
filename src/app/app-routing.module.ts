import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate } from './auth/auth.guard';
import { TrEditComponent } from './main/sidebar/tr-edit/tr-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'main', component: MainComponent, canActivate: [canActivate]},
  {path:'main/:id', component:MainComponent,children:[
    {path: 'edit',component:TrEditComponent}
  ] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
