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
import {MatDialogModule} from '@angular/material/dialog';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StateModule } from 'libs/state/src/lib/state.module';  

import { RegistrationComponent } from './auth/components/registration/registration.component';
import { LogInComponent } from './auth/components/login/login.component';
import { JournalEditorComponent } from './journals/components/editor/editor.component';
import { TimelineComponent } from './journals/components/timeline/timeline.component';
import { JournalPreviewComponent } from './journals/components/preview/preview.component';

import { UserService } from 'libs/state/src/lib/base/services/user.service';
import { JournalViewModal } from './journals/components/modals/journal-display-modal/journal-display-modal.component';


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
    AngularEditorModule,
    HttpClientModule,
    FontAwesomeModule,
    StateModule,
    MatDialogModule,


    RouterModule.forChild(featuresRoutes), RouterModule],

    declarations: [RegistrationComponent, LogInComponent, JournalEditorComponent, TimelineComponent,
                   JournalPreviewComponent, JournalViewModal],
    
})
export class FeaturesModule {}
