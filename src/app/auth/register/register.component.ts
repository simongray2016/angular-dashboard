import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading = false;
  formRegister: FormGroup;
  password = '';

  comfirmPassword = (control: FormControl): { [key: string]: boolean } => {
    if (control.value && control.value !== this.password) {
      return { confirm: true, error: true };
    }
    return {};
  }

  onSubmit(user: {email: string, password: string, name: string,}) {
    // if (this.formRegister.valid) {
    //   this.loading = true;
    //   this.authService.register(user.email, user.password)
    //     .then(() => {
    //       this.loading = false;
    //       this.message.create('success', 'Register success');
    //       this.authService.login(user.email, user.password)
    //         .then(() => {
    //           this.router.navigate(['pages/user']);
    //           this.authService.updateProfile(user.name, null);
    //         });
    //     })
    //     .catch(() => {
    //       this.loading = false;
    //       this.message.create('error', 'Register fail');
    //     });
    // }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkPassword: ['', [Validators.required, this.comfirmPassword]],
      name: ['', [Validators.required]],
      agree: [true]
    });
  }

}
