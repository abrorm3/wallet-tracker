import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  visible:boolean=false;
  changetype:boolean=true;

  viewpassword(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
  onSubmit(form:NgForm){

  }

}
