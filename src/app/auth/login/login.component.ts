import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first } from 'rxjs/operators';
import { DataUserService } from 'src/app/services/data-user.service';

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
    private dataUserService: DataUserService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['ddc', [Validators.required]],
      password: ['phantom97', [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(user: {username: string, password: string, remember: boolean}) {
    if (this.form.valid) {
      this.loading = true;
      // this.authService.login(user.username, user.password)
      //   .then(r => {
          // this.message.create('success', 'Login success');
          // this.loading = false;
          // this.router.navigate(['pages/user']);
      //   })
      //   .catch(e => {
          // this.loading = false;
          // this.message.create('error', 'Wrong user name or password');
      //     }
      //   );
      this.authService.login(user.username, user.password).pipe(first()).subscribe(data => {
        this.message.create('success', 'Login success');
        this.loading = false;
        this.router.navigate(['pages/user']);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.message.create('error', 'Wrong user name or password');
      }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
