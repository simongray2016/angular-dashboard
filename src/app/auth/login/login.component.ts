import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = {
    email: true,
    password: false
  };
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(user: {email: string, password: string, remember: boolean}) {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(user.email, user.password)
        .then(r => {
          this.message.create('success', 'Login success');
          this.loading = false;
          this.router.navigate(['pages/user']);
        })
        .catch(e => {
          this.loading = false;
          this.message.create('error', 'Wrong email or password');
          }
        );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
