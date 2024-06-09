import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

//Klasa obsługująca pasek nawigacji
export class NavbarComponent {

  //Konstruktor przyjmujący authService ora router do sprawdzenia czy użytkownik jest zalogowany oraz przekierowań
  constructor(private service: AuthService, private router: Router){}

  //Sprawdza czy użytkownik jest zalogowany
  isLoggedIn(){
    return this.service.isLoggedIn();
  }

  //Wylogowuje za pomocą serwisu
  logout(){
    this.service.logout();
  }
}
