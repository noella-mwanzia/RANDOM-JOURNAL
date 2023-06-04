import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Journal } from 'libs/model/src/lib/journal.interface';
import { JournalEntriesService } from 'libs/state/src/lib/base/services/journal.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {

  journals$!: Observable<Journal[]>
  
  constructor( private _router: Router,
               private _journalEntriesService: JournalEntriesService<Journal> ) { }

  ngOnInit(): void {

    this.journals$ = this._journalEntriesService.getUserJournals();
  }

  createNewJournal()
  {
    this._router.navigate(['editor'])
  }


}
