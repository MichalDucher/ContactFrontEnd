import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Category } from '../../interfaces/Category';
import { Subcategory } from '../../interfaces/Subcategory';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

//Klasa tworząca formularz do edytowania lub dodawania nowego kontaktu - w zaleznosci od kontekstu wywołania
export class ContactFormComponent implements OnInit{

  //Deklaracja zmiennych i obiektów potrzebnych do formularza i jego zarządzania
  contactForm: FormGroup;
  contactId: number | null = null;
  showPassword: boolean = false;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategory: number | null = null;

  //Konstruktor pryjmujący serwisy i niezbędne składniki do utworzenia formularza
  constructor(
    private formBuilder: FormBuilder,
    private service: ContactService,
    private catService: CategoryService,
    private subService: SubcategoryService,
    private route: ActivatedRoute,
    private router: Router
  ){

    //Utworzenie contactForm
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      categoryid: ['', Validators.required],
      subcategory: ['', Validators.required],
      phonenumber: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }
  // Metoda inicjalizacyjna pobierająca dane konkretnego kontaktu(w przypadku edycji), oraz niezależnie 
  // od przypadku edycji lub dodawania, pobiera dane o kategoriach i podkategoriach
  
  ngOnInit(): void {
    this.contactId = 
      this.route.snapshot.paramMap.get('contactid') ? 
      Number(this.route.snapshot.paramMap.get('contactid')) : 
      null;

      if(this.contactId){
        this.service.getContact(this.contactId).subscribe(
          data => {
            const birthdate = new Date(data.birthdate);
            this.contactForm.patchValue({
              ...data,
              //Zamiana formatu dany na ISO 8061(w celu uniknięcia konfilktu typów danych)
              birthdate: birthdate.toISOString().substring(0, 10)
            });
          },
          error => console.error('Error fetching contact details', error)
        );        
      }
      this.catService.getCategories().subscribe(
        data => this.categories = data,
        error => console.error("Failed fetching categories", error)
      )

      this.subService.getCategories().subscribe(
        data => this.subcategories = data,
        error => console.error("Failed fetching subcategories", error)
      )
  }

  //Funkcja wysyłająca (za pomocą serwisu) zapytanie PUT lub POST, w zależnosci od kontekstu wywołania
  onSubmit(): void {
    if(this.contactForm.valid){
      const contact = this.contactForm.value;

      const birthdate = new Date(contact.birthdate);
      birthdate.setHours(0, 0, 0, 0);
      
      if(contact.categoryid === 2)
        contact.subcategory = "Prywatny";
      
      //Zamiana formatu dany na ISO 8061(w celu uniknięcia konfilktu typów danych)
      contact.birthdate = birthdate.toISOString();      

      //Aktualizuje istniejący kontakt i przekierowuje na stronę główną (gdy id kontaktu istnieje)
      if(this.contactId){
        contact.contactid = this.contactId;
        this.service.updateContact(contact, this.contactId).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error updating contact', error)
        );        
      }//W przeciwnym przypadku dodaje nowy kontakt i przekierowuje na stronę główną 
      else {
        this.service.addContact(contact).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error adding contact', error)
        );
      }
    }
  }

  //Funkcja odpowiedzialna za ustawianie widoczności hasła
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  //Funkcja aktualizująca formularz pod kątem kategorii/podkategorii 
  onCategoryChange(): void {
    //Pobiera wybrane categoryid
    this.selectedCategory = parseInt(this.contactForm.get('categoryid')?.value, 10);

    //Na podstawie categoryid blokuje i odblokowuje pole 'subcategory'. Dla ccategoryid=2(prywatny), blokuje możliwośc
    //wybrania podkategorii i ustawią ją na 'Private'
    if (this.selectedCategory === 2) {
      this.contactForm.get('subcategory')?.setValue("Private");
      this.contactForm.get('subcategory')?.disable();
    } else {
      this.contactForm.get('subcategory')?.enable();
      this.contactForm.get('subcategory')?.setValue('');
    }
  }
}

