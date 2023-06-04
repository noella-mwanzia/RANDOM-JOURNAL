import { Component, Input, OnInit } from '@angular/core';
import { Journal } from 'libs/model/src/lib/journal.interface';
import { __DateFromStorage } from '../../../utilities/convert-date.function';

@Component({
  selector: 'app-journal-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class JournalPreviewComponent implements OnInit {
  
  @Input() journal!: Journal
  constructor() { }

  ngOnInit(): void {
  }

  formatDate()
  {
   return __DateFromStorage(this.journal.createdOn!).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }


}
