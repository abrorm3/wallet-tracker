import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn } from "@angular/router";
import { map, catchError, of } from "rxjs";
import { AuthService } from "./auth.service";

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user =>{
      if(user){
        return true;
      }else{
        router.navigate(['/auth'])
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth']);
      return of(false);
    })
  );
  // return authService.user === null?false:true;
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
