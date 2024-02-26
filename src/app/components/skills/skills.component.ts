import { Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  // encapsulation: ViewEncapsulation.Emulated

})
export class SkillsComponent {
  showBackend: boolean = false;
  showFrontend: boolean = false;
  toggleBackend() {
    this.showBackend = !this.showBackend;
  }
  toggleFrontend() {
    this.showFrontend = !this.showFrontend;
  }
}
