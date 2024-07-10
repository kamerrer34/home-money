import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private title: Title,
  ) {}

  form!: FormGroup;

  ngOnInit() {
    this.title.setTitle('Регистрация');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user: User = new User(email, password, name);

    this.usersService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { nowCanLogin: true }});
      });
  }

  forbiddenEmails(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((users: User[]) => {
          if (users.length) {
            resolve({ forbiddenEmail: true });
          } else {
            resolve(null);
          }
        });
    });
  }
}
