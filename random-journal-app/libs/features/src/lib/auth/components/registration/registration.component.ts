import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[AuthService]
})
export class RegistrationComponent implements OnInit {
  
  registerForm!: FormGroup

  constructor(private _fb: FormBuilder,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm(){
    this.registerForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(16)]],
      lastName: ['', [Validators.required, Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.maxLength(64)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(64)]],
      email:['', [Validators.required, Validators.maxLength(64)]]
    })
  }

  signUp()
  {
    if(this.registerForm.valid)
    {
      const frm = this.registerForm.value;

      const displayName = frm.firstName + frm.lastName;

      this.authService.SignUp(frm.email,frm.password,displayName)
                        .then(() => this.router.navigate(['timeline']))
                        .catch(error => error);
    }
  }

  formIsInvalid()
  {
    return this.registerForm.invalid;
  }

  navigateToSignIn ()
  {
    this.router.navigate(['/']);
  }

}