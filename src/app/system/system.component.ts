import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent {
  constructor(
    private title: Title,
  ) {
    title.setTitle('Домашняя бухгалтерия');
  }
}
