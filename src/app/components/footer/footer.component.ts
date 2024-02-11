import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showContactForm: boolean = false;
  showNotAvaible: boolean = false
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
