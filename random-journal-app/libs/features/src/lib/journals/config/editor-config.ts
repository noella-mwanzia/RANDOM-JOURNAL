import { AngularEditorConfig } from '@kolkov/angular-editor';


/** configurations for the angular editor component */
export const EDITOR_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '85vh',
  width: '90%',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'What is going on in that lovely head?',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  sanitize: false,
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['textColor', 'backgroundColor'],
    [ 'redo', 'fontName'],
    [ 'link', 'unlink', 'insertImage', 'insertVideo', 'removeFormat' ]
  ]
};
