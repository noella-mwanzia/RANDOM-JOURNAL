import { Route } from '@angular/router';
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { LogInComponent } from './auth/components/login/login.component';
import { JournalEditorComponent } from './journals/components/editor/editor.component';
import { TimelineComponent } from './journals/components/timeline/timeline.component';
import { JournalPreviewComponent } from './journals/components/preview/preview.component';

export const featuresRoutes: Route[] = [
    {path: '', component: LogInComponent},
    {path:'register', component: RegistrationComponent},
    {path:'timeline', component: TimelineComponent},
    {path:'editor', component: JournalEditorComponent}
    // {path:'', component:JournalPreviewComponent}


];
