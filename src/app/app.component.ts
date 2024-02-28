import { Component, Renderer2 } from '@angular/core';
import { ContactService } from './services/contact.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularPortfolio';

  constructor(private contactService: ContactService){}

  errorResponseMessageForm = '';
  showContactForm: boolean = false;
  showNotAvaible: boolean = false
  sendSuccess:boolean = false;

  ngOnInit(){
    this.contactService.$modal.subscribe((valu) => { this.showContactForm =valu })
  }
  toggleContactForm(){
   this.contactService.$modal.emit(false);

   setTimeout(() => {
     this.contactService.$modal.emit(true);
   }, 100);
  }

}
