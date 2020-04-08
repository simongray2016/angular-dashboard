import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null;

  private userBehavior: BehaviorSubject<any>;

  user$: Observable<any>;

  constructor(
    public fireAuth: AngularFireAuth,
    public router: Router,
    public http: HttpClient,
    ) {

    this.userBehavior = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')) || null);
    this.user$ = this.userBehavior.asObservable();

    // this.fireAuth.authState.subscribe(user => {
    //     if (user) {
    //       this.user = user;
    //       this.userBehavior.next(this.user);
    //       console.log(this.user);
    //     } else {
    //       this.user = null;
    //       this.userBehavior.next(this.user);
    //     }
    //   },
    // );
  }

  public get currentUserValue(): any {
    return this.userBehavior.value;
  }

  // login with FireBase

  // async login(email: string, password: string) {
  //   return await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  // }

  async register(email: string, password: string) {
    return await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // async logout() {
  //   return await this.fireAuth.auth.signOut();
  // }

  async updateProfile(name: string | null, url: string | null) {
    return await this.fireAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: url
    }).then(r => console.log(r))
      .catch(e => console.log(e));
  }


  // login with JWT

  login(username: string, password: string) {
    return this.http.post('https://hvcg-tm.herokuapp.com/security/login', {username, password})
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userBehavior.next(user);
        }),
        retry(1),
        catchError(err => this.handleError(err))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userBehavior.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLogin() {
    return this.user !== null;
  }

  private handleError(err: any): ObservableInput<any> {
    console.log(err);
    return err;
  }
}
