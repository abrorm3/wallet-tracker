import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService} from "./auth.service";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService){}

  visible:boolean=false;
  changetype:boolean=true;
  isLoginMode = true;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  viewpassword(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      //..
    }
    else{
      this.authService.signup(email,password).subscribe(resData=>{
        console.log(resData);
      }, error=>{
        console.log(error);
      });
    }

    form.reset();

  }

}
