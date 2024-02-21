import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private contactService: ContactService,
    private fb:FormBuilder){}

  contactForm!: FormGroup;
  errorResponseMessageForm = '';
  showContactForm: boolean = false;
  showNotAvaible: boolean = false
  sendSuccess:boolean = false;

  ngOnInit(){
    this.contactForm = this.initForm();
  }
  onFormSubmit(){
    if (this.contactForm.valid) {
      this.sendForm();
    } else {
      this.errorResponseMessageForm = 'Verifique el formulario!';
        setTimeout(() => {
          this.errorResponseMessageForm = '';
        }, 5000);
    }
  }
  sendForm(){
    if(this.contactForm.valid){
      const emailData = this.contactForm.value;

      this.contactService.sendInfoForm(emailData).subscribe((response) =>{
        this.showContactForm = false;
        this.sendSuccess = true;
      },
      (error)=> {
        console.error('Error send form', error);
      }
      )
    }
  }
  initForm(): FormGroup{
    return this.fb.group({
      sendersName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80)]],
      emailAddress:['', [Validators.required, Validators.minLength(8),Validators.maxLength(90)]],
      // phoneNumber:['', [Validators.maxLength(20)]],
      message:['', [Validators.required, Validators.minLength(8),Validators.maxLength(600)]],
    })
  }

  toggleContactForm(){
    this.showContactForm = !this.showContactForm;
  }

  toggleShowNotAvaible(){
    this.showNotAvaible = !this.showNotAvaible;
    if (this.showNotAvaible) {
      setTimeout(() => {
        this.showNotAvaible = false;
      }, 3000);
    }
  }
}
