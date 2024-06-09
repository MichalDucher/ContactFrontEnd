import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

//Klasa tworząca i obsługująca komponent logowania
export class LoginComponent {

  //Deklaracja formularza
  loginForm: FormGroup;

  //Konstruktor przyjmująct fb, authService i router, potrzebne do:
  //  - zbudowania formularza logowania
  //  - autentykacjimużytkownika
  //  - przekierowań
  //Ustawia pola username i password na wymagane, przez co nie ma możliwości wysłania pustego zapyania z poziomu aplikacji 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Metoda wysyłająca zapytanie POST za pomocą serwisu
  onSubmit(){
    if(this.loginForm.valid){
      const { username, password } = this.loginForm.value

      this.authService.login(username, password).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login error', error)
        }
      );
    }
  }
}
