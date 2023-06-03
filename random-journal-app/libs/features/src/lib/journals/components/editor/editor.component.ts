import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EDITOR_CONFIG } from '../../config/editor-config';

@Component({
  selector: 'app-journal-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})


export class JournalEditorComponent implements OnInit 
{
  
	mode: 'edit' | 'view' = 'edit';

  editorConfig = EDITOR_CONFIG;

  editor = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    
  }


}
