import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { User } from 'libs/model/src/lib/user/user.interface';


import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
) 
  {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState
                .subscribe((user) => {
                    if (user) 
                    {
                        this.userData = user;
                        localStorage.setItem('user', JSON.stringify(this.userData));
                        JSON.parse(localStorage.getItem('user')!);
                    }
                    else 
                    {
                        localStorage.setItem('user', 'null');
                        JSON.parse(localStorage.getItem('user')!);
                    }
                    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) 
	{
    return this.afAuth
      					.signInWithEmailAndPassword(email, password)
								.then((result) => {
									this.afAuth.authState.subscribe((user) => {
										if (user) {
											console.log(user);
											this.router.navigate(['splash-screen']);
										}
									});
								})
								.catch((error) => {
									window.alert(error.message);
								});
  }

  // Sign up with email/password
  SignUp(email: string, password: string, displayName:string) 
	{
    return this.afAuth
								.createUserWithEmailAndPassword(email, password)
								.then((res) => {
									this.SetUserData(res.user, displayName);
                  return res.user;
								})
								.catch((error) => {
									window.alert(error.message);
								});
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean 
	{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) 
	{
    return this.afAuth
								.signInWithPopup(provider)
								.then((result) => {
									this.SetUserData(result.user);
								})
								.catch((error) => {
									window.alert(error);
								});
  }

  /* Setting up user data when sign in with username/password,  sign up with username/password and sign in with social auth provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, displayName?:string) 
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc( `users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName ?? user.displayName,
    };

    userRef.set(userData);
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  // 💡 canActivateGuard => Controls if a route can be activated
  isLogged() {
    return of(false).pipe(delay(500));
  }
}