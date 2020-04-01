import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  name: string | null = '';
  form: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
    ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.form = this.formBuilder.group({
          name: [user.displayName, [Validators.required]],
          email: [user.email]
        });
      }
    });
  }

  onSubmit(user: {name: string}) {
    if (this.form.valid && this.user.displayName !== this.form.controls.name.value) {
      this.loading = true;
      this.authService.updateProfile(user.name, null)
        .then(() => {
          this.message.success('Updated');
          this.loading = false;
        })
        .catch(() => {
          this.message.create('error', 'Update Fail');
          this.loading = false;
        })
    }
  }

  reset(event: Event) {
    event.preventDefault();
    if (this.user && this.user.displayName !== this.form.controls.name.value) {
      this.form.setValue({
        name: this.user.displayName,
        email: this.user.email
      });
    }
  }

}
