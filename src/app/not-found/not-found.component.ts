import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(
    private title: Title,
  ) {
    title.setTitle('404');
  }
}
