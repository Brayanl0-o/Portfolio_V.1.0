import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor() { }

    toggleDropdown() {
      const dropdown = document.getElementById("myDropdown");
      if (dropdown) {
        dropdown.classList.toggle("show");
      }
    }

    closeDropdowns() {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i] as HTMLElement;
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }

    onClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).matches('.dropbtn')) {
        this.closeDropdowns();
      }
    }
}
