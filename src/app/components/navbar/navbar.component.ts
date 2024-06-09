import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private service: AuthService, private router: Router){}

  isLoggedIn(){
    return this.service.isLoggedIn();
  }

  logout(){
    this.service.logout();
  }
}
