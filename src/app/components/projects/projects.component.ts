import { Component } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  state_projects = 'hidden';
  showDetailsProject: boolean =  false;

  toggleShowDetails(){
    this.showDetailsProject = !this.showDetailsProject;
  }
}
