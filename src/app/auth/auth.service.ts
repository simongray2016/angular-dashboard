import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null;

  private userBehavior: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.user);

  user$: Observable<User | null> = this.userBehavior.asObservable();

  constructor(public fireAuth: AngularFireAuth, public router: Router) {
    this.fireAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          this.userBehavior.next(this.user);
          console.log(this.user);
        } else {
          this.user = null;
          this.userBehavior.next(this.user);
        }
      },
    );
  }

  async login(email: string, password: string) {
    return await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.fireAuth.auth.signOut();
  }

  async updateProfile(name: string | null, url: string | null) {
    return await this.fireAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: url
    }).then(r => console.log(r))
      .catch(e => console.log(e));
  }

  isLogin() {
    return this.user !== null;
  }
}
