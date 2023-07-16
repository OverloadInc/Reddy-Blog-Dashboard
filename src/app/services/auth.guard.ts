import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const isLogged = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if(isLogged.isLoggedInGuard) {
    router.navigate(['/'])
  }
  else {
    toastr.warning('Access denied');
    router.navigate(['/login']);
  }

  return isLogged.isLoggedInGuard;
};

/*@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private autService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.autService.isLoggedInGuard) {
      this.router.navigate(['/']);
    }
    else {
      this.toastr.warning('Access denied');
      this.router.navigate(['/login']);
    }

    return this.autService.isLoggedInGuard;
  }

}*/
