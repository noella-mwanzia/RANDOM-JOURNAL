import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { JournalEntriesService } from 'libs/state/src/lib/base/services/journal.service';
import { Journal } from 'libs/model/src/lib/journal.interface';

import { EDITOR_CONFIG } from '../../config/editor-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class JournalEditorComponent implements OnInit 
{
  
	mode: 'edit' | 'view' = 'edit';

  editorConfig = EDITOR_CONFIG;

  editor = new FormControl('', Validators.required);

  constructor(private journalService: JournalEntriesService<Journal>,
							private router: Router) { }

  ngOnInit(): void {}

	formIsInvalid()
  {
    return this.editor.invalid;
  }

	submitJournal()
	{
		const html = this.editor.value as string;

		const entry = { html } as Journal

		this.journalService.createJournalEntry(entry).subscribe((res) => this.router.navigate(['timeline']))
	}

}
