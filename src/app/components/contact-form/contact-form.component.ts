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
export class ContactFormComponent implements OnInit{

  contactForm: FormGroup;
  contactId: number | null = null;
  showPassword: boolean = false;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategory: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private service: ContactService,
    private catService: CategoryService,
    private subService: SubcategoryService,
    private route: ActivatedRoute,
    private router: Router
  ){
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

  onSubmit(): void {
    if(this.contactForm.valid){
      const contact = this.contactForm.value;

      const birthdate = new Date(contact.birthdate);
      birthdate.setHours(0, 0, 0, 0);
      
      if(contact.categoryid === 2)
        contact.subcategory = "Prywatny";
      
      contact.birthdate = birthdate.toISOString();      

      if(this.contactId){
        contact.contactid = this.contactId;
        this.service.updateContact(contact, this.contactId).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error updating contact', error)
        );
      } else {
        this.service.addContact(contact).subscribe(
          () => this.router.navigate(['/contacts']),
          error => console.error('Error adding contact', error)
        );
      }
    }
  }
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  onCategoryChange(): void {
    this.selectedCategory = parseInt(this.contactForm.get('categoryid')?.value, 10);

    if (this.selectedCategory === 2) {
      this.contactForm.get('subcategory')?.setValue("Private");
      this.contactForm.get('subcategory')?.disable();
    } else {
      this.contactForm.get('subcategory')?.enable();
      this.contactForm.get('subcategory')?.setValue('');
    }
  }
}

