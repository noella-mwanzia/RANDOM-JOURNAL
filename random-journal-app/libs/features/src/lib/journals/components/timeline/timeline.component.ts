import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Journal } from 'libs/model/src/lib/journal.interface';
import { JournalEntriesService } from 'libs/state/src/lib/base/services/journal.service';
import { Observable } from 'rxjs/internal/Observable';
import { JournalViewModal } from '../modals/journal-display-modal/journal-display-modal.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {

  journals$!: Observable<Journal[]>
  
  constructor( private _router: Router,
               private _journalEntriesService: JournalEntriesService<Journal>,
               public dialog: MatDialog ) { }

  ngOnInit(): void {

    this.journals$ = this._journalEntriesService.getUserJournals();
  }

  createNewJournal()
  {
    this._router.navigate(['editor'])
  }

  viewJournal(journal: Journal)
  {
    this.dialog.open(JournalViewModal, {
        data: {...journal, mode:'view'},
        height: '500px',
        width: '700px',
      });

  }


}
