import{Injectable} from '@angular/core';
import{HttpClient}from '@angular/common/http';

interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
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
  }
}
