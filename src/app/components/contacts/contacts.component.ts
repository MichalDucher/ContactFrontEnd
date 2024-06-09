import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/Contact';
import { Category } from '../../interfaces/Category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})

//Klasa odpowiadająca za wyświetlanie danych kontaktu
export class ContactsComponent implements OnInit{

  //Deklaracja obiektów i zmiennych potrzebnych do wyświetlania odpowiednich danych o kontakcie
  filterForm: FormGroup;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  categories: Category[] = [];

  //Zmienne potrzebne do filtrowania kontaktów
  searchTerm: string ='';
  selectedCategoryId: string = '';

  //Konstruktor przyjmujący sewisy(do pobierania danych) oraz FormBuilder potrzebny do systemy filtrowania kontaktów
  //Ustawia 'categoryid' na 'null' oraz 'searchTerm' na "''", żeby na początku wyświetlały się wszystkie kontakty
  constructor(private service: ContactService, private catService: CategoryService, private fb: FormBuilder){
    this.filterForm = this.fb.group({
      categoryId: [null],
      searchTerm: ['']
    });
  }

  //Funkcja inicjalizacyjna odpowiadająca za pobranie danych o kontaktach oraz kategoriach.
  //Kategorie są potrzebne do filtrowania kontaktów.
  //Przefiltrowane kontakty znajdują się w tablicy 'filteredContacts', na poczatku jest taka sama jak contacts
  ngOnInit(): void {

    this.service.getContacts().subscribe(
      data => this.contacts = data,      
      error => console.error('Error fetching contacts', error)
    );    
    this.service.getContacts().subscribe(
      data => this.filteredContacts = data,      
      error => console.error('Error fetching contacts', error)
    );    

    this.catService.getCategories().subscribe(
      data => this.categories = data,
      error => console.error('Error fetching categories', error)
    );   
    console.log(this.contacts);
    this.applyFilter(); 
  }

  //Funkcja wywołująca service.deleteContact w celu usunięcia kontaktu
  deleteContact(id: number): void {
    this.service.deleteContact(id).subscribe(
      () => this.filteredContacts = this.filteredContacts.filter(c => c.contactid != id),
      error => console.error('Error deleting contact', error)
    );
    
  }

  //Sprawdza czy użytkownik jest zalogowany
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  //Funkcja która bierze poduwagę filtry wybrane przez użytkownika i na ich podstawie określa
  //jakie kontakty wyświetlić
  //Wyświetlają się kontakty z tablicy 'filteredContacts' przy pomocy dyrektywy *ngFor w pliku html.
  applyFilter(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      (!this.selectedCategoryId || contact.categoryid.toString() === this.selectedCategoryId) &&
      (contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
}
