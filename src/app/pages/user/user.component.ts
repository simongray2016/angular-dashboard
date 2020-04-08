import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataUserService } from 'src/app/services/data-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  name: string | null = '';
  username: string;
  role: string;
  form: FormGroup;
  loading = false;
  loadingUser = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private dataUserService: DataUserService
    ) {}

  ngOnInit() {
    this.loadingUser = true;
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.form = this.formBuilder.group({
          name: [user.displayName, [Validators.required]],
          email: [user.email]
        });
        this.dataUserService.getAllUser().subscribe(u => {
          this.loadingUser = false;
          this.username = u['username'];
          this.role = u['role'];
          },
          err => {
            this.loadingUser = false;
            console.log(err);
          }
        );
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
