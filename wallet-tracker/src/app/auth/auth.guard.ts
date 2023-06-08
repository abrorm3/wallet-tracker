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

  return authService.user.pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/auth']);
      return of(false);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
