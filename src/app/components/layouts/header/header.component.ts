import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: string = '';
  isLoggedIn$?: Observable<boolean>;

  constructor(private autService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user') || '{}').email;

    this.isLoggedIn$ = this.autService.isLoggedIn();
  }

  endSession() {
    this.autService.logout();
  }
}
