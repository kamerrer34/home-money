import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { DropdownDirective } from "../../shared/directives/dropdown.directive";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DatePipe,
    DropdownDirective,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  date: Date = new Date();
  user!: User;

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user') || '');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
