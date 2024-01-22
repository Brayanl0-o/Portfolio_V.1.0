import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private renderer: Renderer2) { }
  showNavSmall: boolean = false;


  showNav(){
    if (!this.showNavSmall) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');

    } else {
      this.renderer.removeStyle(document.body, 'overflow');

    }
    this.showNavSmall = !this.showNavSmall;

  }

  closeNav(){
    this.renderer.removeStyle(document.body, 'overflow')
    this.showNavSmall = false;
  }
}
