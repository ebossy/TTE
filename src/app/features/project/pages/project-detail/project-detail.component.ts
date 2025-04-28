import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {Project} from '../../models/Project';
import {ProjectFirestoreService} from '../../services/project-firestore.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-project-detail',
  imports: [
    SidenavToolbarLayoutComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent  implements OnInit {
  project: Observable<Project> = of();

  constructor(private route: ActivatedRoute,
              private projectFire: ProjectFirestoreService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let projektId:any;
      projektId = params.get('id');
      this.project = this.projectFire.getDocById(projektId)
    });
  }
}
