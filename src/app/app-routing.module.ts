import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { authGuard } from './auth/auth.guard';

//Definicja tras i dostępu do nich
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact-details/:contactid', component: ContactDetailsComponent },
  { path: 'add-contact', component: ContactFormComponent, canActivate: [authGuard] }, //Trasa dostępna tylko dla zalogowanego użytkownika
  { path: 'edit-contact/:contactid', component: ContactFormComponent, canActivate: [authGuard] },//Trasa dostępna tylko dla zalogowanego użytkownika
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
