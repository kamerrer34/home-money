import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { UsersService } from "../../shared/services/users.service";
import { AuthService } from "../../shared/services/auth.service";
import { Message } from "../../shared/models/message.model";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) {}

  message!: Message;
  form!: FormGroup;

  ngOnInit() {
    this.title.setTitle('Вход в систему');
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({ text: 'Теперь вы можете зайти в систему', type: 'success' });
        } else if (params['accessDenied']) {
          this.showMessage({ text: 'Необходима авторизация', type: 'warning' });
        }
      });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe((user: User[]) => {
      const currUser = user[0] ? user[0] : undefined;
      if (currUser) {
        if (currUser.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(currUser));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({ text: 'Пароль не верный', type: 'danger' });
        }
      } else {
        this.showMessage({ text: 'Такого пользователя не существует', type: 'danger' });
      }
    });
  }
}
