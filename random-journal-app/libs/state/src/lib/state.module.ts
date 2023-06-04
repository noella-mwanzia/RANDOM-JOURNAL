import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './base/services/user.service';
import { JournalEntriesService } from './base/services/journal.service';

/**
 * User module. Contains user settings and interaction
 */
// TODO: forRoot
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [UserService,JournalEntriesService],
  exports: [],
})
export class StateModule { }
