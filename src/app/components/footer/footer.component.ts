import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private contactService: ContactService,
    private renderer: Renderer2,
    private fb:FormBuilder){}

  contactForm!: FormGroup;
  errorResponseMessageForm = '';
  showContactForm: boolean = false;
  showNotAvaible: boolean = false
  sendSuccess:boolean = false;

  toggleContactForm(){
    this.showContactForm = !this.showContactForm;
    // this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
  ngOnInit(){
    this.contactService.$modal.subscribe((valu) => { this.showContactForm =valu })
  }

}
