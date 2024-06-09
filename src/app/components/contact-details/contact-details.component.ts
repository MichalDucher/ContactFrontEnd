import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/Contact';
import { Category } from '../../interfaces/Category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})

//Klasa zarządzająca wyświetlaniem szczegółowych danych o kontakcie

export class ContactDetailsComponent implements OnInit{
  contact?: Contact;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private service: ContactService, private catService: CategoryService){}

  //Funkcja inicjalizacyjna pobierająca z API dane kontaktu oraz jego kategorię na podstawie "categoryid"
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('contactid');
    this.service.getContact(Number(id)).subscribe(
      data => this.contact = data,
      error => console.error('Error fetching contact details', error)
    );

    this.catService.getCategories().subscribe(
      data => this.categories = data,
      error => console.error("Some problem", error)
    );
  }

  //Funkcja maskująca hasło
  getMaskedPassword(): string {
    return '•'.repeat(this.contact?.password?.length || 0);
  }

  //Funkcja zwracająca odpowiednią kategorię
  getCategoryName(categoryId: number): string {
    const foundCategory = this.categories.find(category => category.categoryid === categoryId);
    return foundCategory ? foundCategory.categoryname : '';
  }
}
