import{Injectable} from '@angular/core';
import{HttpClient, HttpErrorResponse}from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
  constructor(private http: HttpClient){}

  signup(email:string, password:string){
    // post<Auth...> - because we expect the data to get in this format so we give hint.
    // AuthResponseData we have defined above in interface format
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp91xKJKazfb-pG81eJUkUWmLvFpZiw9c',
    {
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(catchError(this.handleError))
  }

  login(email:string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp91xKJKazfb-pG81eJUkUWmLvFpZiw9c',
    {
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(catchError(this.handleError))
  }
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(() => new Error(errorMessage));
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage='This email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage='This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage='Password or Email is invalid'
      }
      return throwError(() => new Error(errorMessage));
  }
}
