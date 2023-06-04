import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { __DateFromStorage } from 'libs/features/src/lib/utilities/convert-date.function';

@Component({
  selector: 'app-journal-modal',
  templateUrl: './journal-display-modal.component.html',
  styleUrls: ['./journal-display-modal.component.scss']
})

export class JournalViewModal implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  formatDate()
  {
   return __DateFromStorage(this.data.createdOn!).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }


}
