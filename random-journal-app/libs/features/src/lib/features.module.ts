import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { featuresRoutes } from './lib.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { RegistrationComponent } from './auth/components/registration/registration.component';
import { LogInComponent } from './auth/components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCheckboxModule,

    RouterModule.forChild(featuresRoutes), RouterModule],

    declarations: [RegistrationComponent, LogInComponent]
})
export class FeaturesModule {}
