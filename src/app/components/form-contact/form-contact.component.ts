import {  Component, Renderer2 } from '@angular/core';
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
    errorResponseMessageForm: string | null = null;
    showContactForm: boolean = false;
    showNotAvaible: boolean = false
    showDetailsProject: boolean =  false;
    isLoading: boolean = false;

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

    sendForm(){
      this.isLoading = true;

      if(this.contactForm.valid){
        const emailData = this.contactForm.value;
        this.contactService.sendInfoForm(emailData).subscribe((response) =>{
          this.closeModal()
          this.isLoading = false;

          this.contactService.$success_send.emit(true)
          setTimeout(() => {
            this.contactService.$success_send.emit(false);
          }, 5000);
        },
        (err)=> {
          console.error('Error send form', err);
          this.isLoading = false;

        })
      }else{
        this.errorResponseMessageForm = 'Falta un campo!';
        this.isLoading = false;

        setTimeout(() => {
          this.errorResponseMessageForm = null;
        }, 5000);

      }
    }
    initForm(): FormGroup{
      return this.fb.group({
        sendersName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80),Validators.pattern('[A-Za-z\\s]+')]],
        emailAddress:['', [Validators.required, Validators.minLength(8),Validators.maxLength(90),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        message:['', [Validators.required, Validators.minLength(8),Validators.maxLength(600),Validators.pattern('[A-Za-z\\s]+')]],
      })
    }

}
  // onFormSubmit(){
    //   this.isLoading = true;

    //   if (this.contactForm.valid) {
    //     this.sendForm();

    //   } else {
    //     this.errorResponseMessageForm = 'Verifique el formulario!';
    //       setTimeout(() => {
    //         this.errorResponseMessageForm = '';
    //       }, 5000);
    //   }
    // }
