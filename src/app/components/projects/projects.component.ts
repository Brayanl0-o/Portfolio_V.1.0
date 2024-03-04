import { Component } from '@angular/core';
import { projects_info } from 'src/app/models/projects';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  state_projects = 'hidden';
  // showDetailsProject: boolean =  false;

  showDetailsProject: projects_info = {
    allin:false,
    books_haven:false,
    pacto:false,
    winner_computers:false,
    dezeer:false,
  }
  toggleShowDetails(field: keyof projects_info){
    this.showDetailsProject[field] = !this.showDetailsProject[field];
  }
}
