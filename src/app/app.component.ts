import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidenavToolbarLayoutComponent} from "./core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    imports: [RouterOutlet],
})
export class AppComponent {
  title = 'TTE';
}
