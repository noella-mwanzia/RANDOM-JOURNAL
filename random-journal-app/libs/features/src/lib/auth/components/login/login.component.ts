import { Component, OnInit } from '@angular/core';

import { SubSink } from 'subsink';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LogInComponent implements OnInit {
  
  signInForm!: FormGroup

  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';

  // allows you to unsubscribe from observables gracefully!
  private subs = new SubSink();
  
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private _fb: FormBuilder,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              public authservice: AuthService) { }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
        this.breakpointChanged()
  );
    this._initializeForm();
  }

  private breakpointChanged() 
  {
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    } else if(this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.currentBreakpoint = '(min-width: 500px)';
    }
  }

  private _initializeForm(){
    this.signInForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(64)]],
      })
  }

  navigateToSignUp ()
  {
    this.router.navigate(['/sign-up']);
  }

  ngOnDestroy = () => this.subs.unsubscribe();


}
