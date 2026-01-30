import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {
  @Input() code = '';
  @Output() codeChange = new EventEmitter<string>();

  onInput(value: string) {
    this.codeChange.emit(value);
  }
}
