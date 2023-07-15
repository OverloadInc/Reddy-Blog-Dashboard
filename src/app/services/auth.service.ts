import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private angularFireAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
  }

  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('User authenticated successfully');

      this.loadUser();

      this.loggedIn.next(true);

      this.router.navigate(['/']);

    }).catch(error => {
      this.toastr.error(error);
    });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.toastr.success('User logged out successfully');

      localStorage.removeItem('user');

      this.loggedIn.next(false);

      this.router.navigate(['/login']);
    });
  }

  loadUser() {
    this.angularFireAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
