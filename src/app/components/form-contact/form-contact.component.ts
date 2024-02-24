import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent {
  constructor(private contactService: ContactService,
    private renderer: Renderer2,
    private fb:FormBuilder){}

    contactForm!: FormGroup;
    errorResponseMessageForm = '';
    showContactForm: boolean = false;
    showNotAvaible: boolean = false
    sendSuccess:boolean = false;
    showDetailsProject: boolean =  false;

    toggleShowDetails(){
      this.showDetailsProject = !this.showDetailsProject;
    }

    closeModal() {
      // this.renderer.removeStyle(document.body, 'overflow');
      this.contactService.$modal.emit(false)
    }
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
    toggleShowNotAvaible(){
      this.showNotAvaible = !this.showNotAvaible;
      if (this.showNotAvaible) {
        setTimeout(() => {
          this.showNotAvaible = false;
        }, 3000);
      }
    }
}
