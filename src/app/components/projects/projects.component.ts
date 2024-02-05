import { Component, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('aparicion-titles',[
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.6)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('3.5s ease-in')),
    ]),
    trigger('aparicion-images', [
      state('hidden', style({
        opacity: 0.2,
        transform: 'scale(0.2)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('3.5s ease-in')),
    ]),
  ]
})
export class ProjectsComponent {
  state = 'hidden';
  // sectionOffsetTop = 0;
  // constructor(private el: ElementRef) {}

  // ngOnInit() {
  //   this.sectionOffsetTop = this.el.nativeElement.offsetTop;
  // }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollThreshold = 50;
    if (scrollPosition > scrollThreshold) {
      this.state = 'visible';
    }
  }
}
