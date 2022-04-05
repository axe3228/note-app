import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// My Import
import { Note } from '../../note';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent implements OnInit {
  @Input() note!: Note;
  @Output() onDeleteNote: EventEmitter<Note> = new EventEmitter();
  @Output() onLoadNote: EventEmitter<Note> = new EventEmitter();
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  onDelete(note: any) {
    this.onDeleteNote.emit(note);
  }

  onLoad(note: any) {
    this.onLoadNote.emit(note);
  }
}
