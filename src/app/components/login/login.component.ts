import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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
