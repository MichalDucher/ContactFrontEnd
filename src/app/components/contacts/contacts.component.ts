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
export class ContactsComponent implements OnInit{

  filterForm: FormGroup;

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  categories: Category[] = [];

  searchTerm: string ='';
  selectedCategoryId: string = '';

  constructor(private service: ContactService, private catService: CategoryService, private fb: FormBuilder){
    this.filterForm = this.fb.group({
      categoryId: [null],
      searchTerm: ['']
    });
  }

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

  deleteContact(id: number): void {
    this.service.deleteContact(id).subscribe(
      () => this.contacts = this.contacts.filter(c => c.contactid != id),
      error => console.error('Error deleting contact', error)
    );
    
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  applyFilter(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      (!this.selectedCategoryId || contact.categoryid.toString() === this.selectedCategoryId) &&
      (contact.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  
    console.log('Filtered Contacts:', this.filteredContacts);
  }
  
}
