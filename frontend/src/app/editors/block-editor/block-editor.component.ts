import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {Input, Output, Component, EventEmitter, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss'],
  standalone: true,
  imports: [DragDropModule, NgForOf]
})
export class BlockEditorComponent implements OnInit {
  @Input() blocks: string[] = [];
  @Output() codeChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.updateCode()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
    this.updateCode();
  }

  updateCode() {
    this.codeChange.emit(this.blocks.join('\n'));
  }
}
